import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';

export default function HealthUnit() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    async function loadStoragedData() {
      const userInfo = await loadUserInfo();
      setInfo(userInfo);

      // Mocking the API call with static data.
      const notifications = [
        {
          id: 1,
          title: 'Consulta agendada',
          content: 'Sua consulta com o Dr. Silva está agendada para 1 de Julho, às 14:00.',
          date: '26 de Junho, 2023',
          buttonLabel: 'Confirmar Presença',
          buttonLabelTwo: 'Desmarcar'
        },
        {
          id: 2,
          title: 'Resultado de exame',
          content: 'O resultado do seu exame de sangue já está disponível. Por favor, agende uma consulta para a revisão.',
          date: '25 de Junho, 2023',
          buttonLabel: '',
          buttonLabelTwo: ''
        },
        {
          id: 3,
          title: 'Vacinação agendada',
          content: 'Lembrete: sua vacinação contra a gripe está agendada para amanhã. Não se esqueça de levar seu cartão de vacinação.',
          date: '24 de Junho, 2023',
          buttonLabel: 'Confirmar Presença',
          buttonLabelTwo: 'Desmarcar'
        },
        {
          id: 4,
          title: 'Alteração de horário',
          content: 'Informamos que houve uma alteração no horário da sua consulta. Agora será às 15:30.',
          date: '23 de Junho, 2023',
          buttonLabel: 'Confirmar Presença',
          buttonLabelTwo: 'Desmarcar'
        },
        {
          id: 5,
          title: 'Confirmação de agendamento',
          content: 'Seu agendamento para a cirurgia foi confirmado. Por favor, compareça ao hospital no dia e horário marcados.',
          date: '22 de Junho, 2023',
          buttonLabel: 'Confirmar Presença',
          buttonLabelTwo: 'Desmarcar'
        },
        {
          id: 6,
          title: 'Consulta cancelada',
          content: 'Infelizmente, a consulta agendada para amanhã foi cancelada devido a imprevistos. Entre em contato para reagendar.',
          date: '21 de Junho, 2023',
          buttonLabel: '',
          buttonLabelTwo: ''
        },
        {
          id: 7,
          title: 'Receita médica disponível',
          content: 'Sua receita médica já está disponível para retirada na recepção do hospital.',
          date: '20 de Junho, 2023',
          buttonLabel: '',
          buttonLabelTwo: ''
        },
        {
          id: 8,
          title: 'Alteração no local da consulta',
          content: 'A consulta com o Dr. Almeida será realizada no novo prédio do hospital.',
          date: '19 de Junho, 2023',
          buttonLabel: 'Confirmar Presença',
          buttonLabelTwo: 'Desmarcar'
        },
      ];
      setNotifications(notifications);

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  useEffect(() => {
    if (counter > 0 && disableButton) {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (counter === 0) {
      setDisableButton(false);
    }
  }, [counter, disableButton]);

  function handleNotificationPress(notification) {
    setSelectedNotification(notification);
    setModalVisible(true);
    setDisableButton(true);
    setCounter(5);
  }

  function handleConfirmPress() {
    // Handle the "confirm" button press, for example mark the notification as read.
    const updatedNotifications = notifications.filter(
      (item) => item.id !== selectedNotification.id
    );
    setNotifications(updatedNotifications);
    setModalVisible(false);
  }

  if (loading) return <Load />;

  return (
    <Animatable.View style={styles.container}>
      <Animatable.View style={styles.containerForm} delay={600} animation="fadeInUp">
        <Text style={styles.title}>Suas notificações</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNotificationPress(item)}
              style={styles.notificationItem}
            >
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationDate}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedNotification?.title}</Text>
              <Text style={styles.modalContent}>{selectedNotification?.content}</Text>

              <View style={styles.containerButton}>
                {selectedNotification?.buttonLabel && selectedNotification?.buttonLabelTwo ? (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.buttonConfirm,
                        disableButton && styles.disabledButton,
                      ]}
                      onPress={handleConfirmPress}
                      disabled={disableButton}
                    >
                      <Text style={styles.buttonText}>
                        {disableButton
                          ? `${selectedNotification?.buttonLabel} ${counter}s`
                          : selectedNotification?.buttonLabel}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.buttonCancel,
                        disableButton && styles.disabledButton,
                      ]}
                      onPress={handleConfirmPress}
                      disabled={disableButton}
                    >
                      <Text style={styles.buttonText}>
                        {disableButton
                          ? `${selectedNotification?.buttonLabelTwo} ${counter}s`
                          : selectedNotification?.buttonLabelTwo}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.buttonOk} onPress={handleConfirmPress}>
                    <Text style={styles.buttonText}>Ok</Text>
                  </TouchableOpacity>
                )}
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
    backgroundColor: '#f0f0f5',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#f0f0f5',
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
    color: '#333',
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  notificationDate: {
    fontSize: 14,
    color: '#666',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonConfirm: {
    backgroundColor: '#8bc34a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonOk: {
    backgroundColor: '#179ee8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
