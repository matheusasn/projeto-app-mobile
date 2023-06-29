import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';

export default function ExamResults() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    async function loadStoragedData() {
      const userInfo = await loadUserInfo();
      setInfo(userInfo);
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  if (loading) return <Load />;

  const exams = [
    {
      id: 2,
      specialty: 'Dermatologia',
      tests: [
        {
          id: 3,
          name: 'Biopsia de Pele',
          info: 'A biópsia de pele é um procedimento realizado para obter uma amostra de tecido da pele para análise laboratorial. É usado para diagnosticar doenças de pele, como câncer de pele e infecções cutâneas.',
          status: 'Pendente',
          date: '02/07/2023',
          pdfUrl: null,
        },
        {
          id: 4,
          name: 'Teste de Alergia',
          info: 'O teste de alergia é usado para identificar substâncias às quais uma pessoa pode ser alérgica. Pode ser feito por meio de testes cutâneos ou exames de sangue.',
          status: 'Liberado',
          date: '05/07/2023',
          pdfUrl: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        },
      ],
    },
    {
      id: 3,
      specialty: 'Oftalmologia',
      tests: [
        {
          id: 5,
          name: 'Exame de Acuidade Visual',
          info: 'O exame de acuidade visual é realizado para avaliar a nitidez e a capacidade de enxergar detalhes finos. É comumente usado para determinar a necessidade de óculos ou lentes de contato.',
          status: 'Liberado',
          date: '10/07/2023',
          pdfUrl: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        },
        {
          id: 6,
          name: 'Fundo de Olho',
          info: 'O exame de fundo de olho é usado para avaliar a saúde dos vasos sanguíneos, nervos e tecidos da retina. Pode ajudar a diagnosticar doenças oculares, como glaucoma, degeneração macular e retinopatia diabética.',
          status: 'Pendente',
          date: '15/07/2023',
          pdfUrl: null,
        },
      ],
    },
    {
      id: 4,
      specialty: 'Ginecologia',
      tests: [
        {
          id: 7,
          name: 'Papanicolau',
          info: 'O exame de Papanicolau é uma coleta de células do colo do útero para detectar alterações que possam indicar a presença de câncer cervical ou outras condições anormais. É um importante exame de rastreamento para a saúde da mulher.',
          status: 'Liberado',
          date: '20/07/2023',
          pdfUrl: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        },
        {
          id: 8,
          name: 'Ultrassom Pélvico',
          info: 'O ultrassom pélvico é um exame de imagem usado para visualizar os órgãos reprodutivos femininos, como o útero e os ovários. É frequentemente utilizado para diagnóstico e acompanhamento de condições ginecológicas.',
          status: 'Pendente',
          date: '25/07/2023',
          pdfUrl: null,
        },
      ],
    },
    {
      id: 5,
      specialty: 'Ortopedia',
      tests: [
        {
          id: 9,
          name: 'Radiografia do Joelho',
          info: 'A radiografia do joelho é um exame de imagem que utiliza raios-X para avaliar a estrutura óssea do joelho. É usado para diagnosticar fraturas, deslocamentos, doenças degenerativas e outras condições que afetam o joelho.',
          status: 'Liberado',
          date: '30/07/2023',
          pdfUrl: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        },
        {
          id: 10,
          name: 'Ressonância Magnética da Coluna',
          info: 'A ressonância magnética da coluna é um exame de imagem que usa campos magnéticos e ondas de rádio para produzir imagens detalhadas da coluna vertebral. É útil para diagnosticar problemas como hérnias de disco, tumores e lesões na coluna.',
          status: 'Pendente',
          date: '05/08/2023',
          pdfUrl: null,
        },
      ],
    },
  ];
  

  const openPdf = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const openModal = (test) => {
    setSelectedTest(test);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Animatable.View style={styles.container}>
      <Animatable.View style={styles.containerForm} delay={600} animation="fadeInUp">
        <Text style={styles.title}>Meus Exames</Text>

        <ScrollView>
          {exams.map((exam) => (
            <View key={exam.id} style={styles.examContainer}>
              <Text style={styles.specialty}>{exam.specialty}</Text>

              {exam.tests.map((test) => (
                <TouchableOpacity
                  key={test.id}
                  style={[
                    styles.testContainer,
                    test.status === 'Liberado' ? styles.testContainerLiberated : styles.testContainerPending,
                  ]}
                  onPress={() => openModal(test)}
                  disabled={!test.pdfUrl}
                >
                  <Text style={styles.testName}>{test.name}</Text>
                  <Text style={styles.testDate}>Data: {test.date}</Text>
                  <View style={styles.statusContainer}>
                    <Text
                      style={[
                        styles.statusText,
                        test.status === 'Liberado' ? styles.statusTextLiberated : styles.statusTextPending,
                      ]}
                    >
                      {test.status === 'Liberado' ? 'Liberado' : 'Pendente'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedTest?.name}</Text>
              <Text style={styles.modalInfo}>{selectedTest?.info}</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#007AFF' }]}
                  onPress={() => openPdf(selectedTest?.pdfUrl)}
                  disabled={!selectedTest?.pdfUrl}
                >
                  <Text style={styles.modalButtonText}>Abrir PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#D3D3D3' }]}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Animatable.View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  examContainer: {
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  specialty: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
  },
  testContainerLiberated: {
    borderColor: '#7ED957',
  },
  testContainerPending: {
    borderColor: '#D3D3D3',
  },
  testName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusContainer: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    textAlign: 'center',
    minWidth: 70,
  },
  statusTextLiberated: {
    backgroundColor: '#7ED957',
    color: '#fff',
  },
  statusTextPending: {
    backgroundColor: '#D3D3D3',
    color: '#fff',
  },
  testDate: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
