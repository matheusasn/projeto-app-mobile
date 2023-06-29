import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';
import api from '../../services/api';

export default function Schedule() {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [data, setData] = useState({});
  const [preceduresData, setPreceduresData] = useState({});
  const [examsData, setExamsData] = useState({});

  useEffect( () => {
    async function loadStoragedData() {
      const userInfo = await loadUserInfo();
      setInfo(userInfo);
      setLoading(false);
    }
     loadStoragedData();
  }, []);

  useEffect(() => {
    async function handleGetSchedules() {
      const { data } = await api.get(`getAgendamento?idPaciente=${info.idPaciente}`);
      setData(data);
      setLoading(false);
    }
    if (info.idPaciente) {
      handleGetSchedules();
    }
  }, [info]);

  // if(data && data.length > 0 && data.status !== 2) {
  //   setPreceduresData(data.filter(item => item.tipo === 2));
  //   setExamsData(data.filter(item => item.tipo === 1));
  // }

  if (loading) {
    return <Load />;
  }
  return (
    <Animatable.View style={styles.container} animation="fadeInUp">
      <View style={styles.containerUser}>
        <View style={styles.contentUser}>
          <Text style={styles.titleUser}>{info?.name}</Text>  
          <TouchableOpacity 
            style={styles.buttonUser}
            activeOpacity={0.9} 
            onPress={() => navigation.navigate('Profile')}
          >
            <FontAwesome5 name="user-circle" size={24} color="#179ee8" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.captionUser}>Paciente</Text>  
        </View>
        <View style={styles.contentUser}>
          <Text style={styles.titleUser}>Meus Agendamentos</Text>  
        </View>
      </View>
      <ScrollView style={styles.containerMain}>
        <View style={styles.containerProcedures}>
          <Text style={styles.textProcedures}>Procedimentos</Text>
          <View>
            {data && data.length > 0 && data.status !== 2 ? (
              data.map(item => {
                if (item.tipo === 2) {
                  return (
                    <View key={item.id}>
                      <TouchableOpacity
                        style={styles.buttonProcedures}
                        onPress={() =>
                          navigation.navigate('ScheduleInfo', {
                            id: item.procedimento,
                            type: 'procedures',
                            description: item.descricao,
                          })
                        }
                      >
                        <Text style={styles.buttonText}>{item.descricao}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })
            ) : (
              <View key="no-procedures">
                <Text>NÃO EXISTEM CONSULTAS MARCADAS NO MOMENTO.</Text>
              </View>
            )}
          </View>

        </View>
        <View style={styles.containerExams}>
          <Text style={styles.textExams}>Exames</Text>
          <View>
            {data && data.length > 0 && data.status !== 2 ? (
              data.map(item => {
                if (item.tipo === 1) {
                  return (
                    <View key={item.id}>
                      <TouchableOpacity
                        style={styles.buttonExams}
                        onPress={() =>
                          navigation.navigate('ScheduleInfo', {
                            id: item.procedimento,
                            type: 'exams',
                            description: item.descricao,
                          })
                        }
                      >
                        <Text style={styles.buttonText}>{item.descricao}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })
            ) : (
              <View key="no-exams" style={styles.contentExams}>
                <Text>NÃO EXISTEM EXAMES MARCADOS NO MOMENTO.</Text>
              </View>
            )}
          </View>

        </View>
      </ScrollView>

      <View style={styles.containerAttention}>
        <View style={styles.contentAttention}>
          <Text style={styles.textPersonalAttention}>ATENÇÃO</Text>
          <Text style={styles.textAttention}>A marcação de consultas e exames deve ser feito presencialmente e está sujeito a disponibilidade de vagas.</Text>
        </View>
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerUser: {
    margin: '6%',
    marginBottom: '2%',
    marginTop: 40,
  },
  contentUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleUser: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 34,
    fontWeight: 700
  },
  captionUser: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 17,
    fontWeight: 300
  },
  
  containerMain: {
    margin: '6%',
    marginTop: 1,
  },

  containerProcedures: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentProcedures: {
    maxHeight: 140
  },

  textProcedures: {
    fontSize: 17,
    fontWeight: 700,
    color: '#00B0F3',
    alignItems: 'center',
    marginBottom: 10
  },

  containerExams: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },

  contentExams: {
    minHeight: 140
  },

  textExams: {
    fontSize: 17,
    fontWeight: 700,
    color: '#DE0788',
    alignItems: 'center',
    marginBottom: 10
  },

  containerAttention: {
    margin: '6%',
    marginTop: 0,
    paddingTop: 0
  },

  contentAttention: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPersonalAttention: {
    fontSize: 17,
    fontWeight: 700,
    color: '#666666',
    marginTop: 10,
    marginBottom: 4,
  },
  textAttention: {
    fontSize: 15,
    fontWeight: 300,
    color: '#666666',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonProcedures: {
    backgroundColor: '#00B0F3',
    width: 320,
    height: 72,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 24,
  },

  buttonExams: {
    backgroundColor: '#DE0788',
    width: 320,
    height: 72,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 24,
  },

  buttonText: {
    fontSize: 19,
    fontWeight: 700,
    textAlign: 'center',
    color: '#fff',
  },
});


