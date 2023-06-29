import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';

export default function ScheduleInfo() {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState({})


  useEffect(() => {
    async function loadStoragedData() {
        const userInfo = await loadUserInfo()
        setInfo(userInfo)
        setLoading(false)
    }
    loadStoragedData()
  })

  if(loading)
        return <Load />

  return (
    <Animatable.View style={styles.container} animation="fadeInUp">
      <View style={styles.containerUser}>
        <View style={styles.contentUser}>
          <Text style={styles.titleUser}>INFOOOO</Text>  
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
        <View style={styles.containerProcedures}>
          <Text style={styles.textProcedures}>Procedures</Text>
          <View style={styles.contentProcedures}>
            <View>
              <TouchableOpacity
                style={styles.buttonProcedures}
                onPress={() => navigation.navigate('ExamResults')}>
                <Text style={styles.buttonText}>Clínico Geral</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonProcedures}
                onPress={() => navigation.navigate('')}>
                <Text style={styles.buttonText}>Ortopedia</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.containerExams}>
          <Text style={styles.textExams}>Exames</Text>
          <View style={styles.contentExams}>
            <View>
              <TouchableOpacity
                style={styles.buttonExams}
                onPress={() => navigation.navigate('')}>
                <Text style={styles.buttonText}>Raio-X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.containerAttention}>
          <Text style={styles.textPersonalAttention}>ATENÇÃO</Text>
          <Text style={styles.textAttention}>A marcação de consultas e exames deve ser feito presencialmente e está sujeito a disponibilidade de</Text>
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
    marginTop: 40,
    marginBottom: 20,
  },

  contentProcedures: {
    minHeight: 180
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
    marginTop: 20,
    marginBottom: 20,
  },

  contentExams: {
    minHeight: 180
  },

  textExams: {
    fontSize: 17,
    fontWeight: 700,
    color: '#DE0788',
    alignItems: 'center',
    marginBottom: 10
  },

  containerAttention: {
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
    alignItems: 'center'
  },

  buttonProcedures: {
    backgroundColor: '#00B0F3',
    width: 364,
    height: 72,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 24,
  },

  buttonExams: {
    backgroundColor: '#DE0788',
    width: 364,
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


