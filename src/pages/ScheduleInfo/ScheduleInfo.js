import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';
import api from '../../services/api';

export default function ScheduleInfo() {

  const route = useRoute();
  const { id, type, description } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [data, setData] = useState({});



  useEffect(() => {
    async function loadStoragedData() {
        const userInfo = await loadUserInfo()
        setInfo(userInfo)
        setLoading(false)
    }
    loadStoragedData()
  }, [])

  useEffect(() => {
    async function handleGetSchedules() {
      const { data } = await api.get(`getInfoAgendamento?idAgendamento=1`);
      setData(data);
      setLoading(false);
    }
    if (info.idPaciente) {
      handleGetSchedules();
    }
  }, [info]);

  if(loading)
        return <Load />

  return (
    <Animatable.View style={styles.container} animation="fadeInUp">
      <View style={styles.containerUser}>
        <View style={styles.contentUser}>
          <Text style={styles.titleUser}>{info.name}</Text>  
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
      </View>
      <View style={styles.containerMain}>
        <View style={styles.contentUser}>
          <Text style={styles.titleUser}>Meus Agendamentos</Text>  
        </View>
      </View>
      <ScrollView style={styles.containerMain}>
        {
          type === 'procedures' 
          ?
            <View style={styles.containerProcedures}>
              <Text style={styles.textProcedures}>Procedimentos</Text>
              <View style={styles.descriptionInfo}>
                <Text style={styles.titleDescription}>{description}</Text>
                
              </View>
              <View style={styles.descriptionInfoLocal}>
                
              </View>
              {
                data && data.length > 0 && data.status !== 2 ?
                  data.map(item => (
                    <View style={styles.descriptionInfoLocal}>
                      <Text style={styles.textOption}>Data: <Text style={styles.captionUser}>{data[0].dataAgendamento}</Text></Text>
                      <Text style={styles.textOption}>Turno: <Text style={styles.captionUser}>{data[0].horarioAgendamento}</Text></Text>
                      <Text style={styles.textOption}>Local: <Text style={styles.captionUser}>{data[0].nomeUnidade}</Text></Text>
                    </View>
                  ))
                :
                <View>          
                   <Load color="#000"/>
                </View>
              }
            </View> 
          :
            <View style={styles.containerExams}>
              <Text style={styles.textExams}>Exames</Text>
              <View style={styles.descriptionInfo}>
                <Text style={styles.titleDescription}>{description}</Text>
                
              </View>
              <View style={styles.descriptionInfoLocal}>
                
              </View>
              {
                data && data.length > 0 && data.status !== 2 ?
                  data.map((item, index) => (
                    <View style={styles.descriptionInfoLocal}>
                      <Text style={styles.textOption}>Data: <Text style={styles.captionUser}>{data[0].dataAgendamento}</Text></Text>
                      <Text style={styles.textOption}>Turno: <Text style={styles.captionUser}>{data[0].horarioAgendamento}</Text></Text>
                      <Text style={styles.textOption}>Local: <Text style={styles.captionUser}>{data[0].nomeUnidade}</Text></Text>
                    </View>
                  ))
                :
                <View>
                  <Load color="#000" />
                </View>
              }

            </View>
        }
        
        
      </ScrollView>
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
    justifyContent: 'flex-start',
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
    alignItems: 'flex-start',
    marginBottom: 10
  },

  descriptionInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },

  descriptionInfoLocal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 30
  },

  titleDescription: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 25,
    fontWeight: 700,
    alignItems: 'center',
    justifyContent: 'center'
  },

  containerExams: {
    justifyContent: 'flex-start',
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

  textOption: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight: 700,
    marginTop: 2,
    marginBottom: 2,
  },
  captionUser: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 17,
    fontWeight: 300
  },
});