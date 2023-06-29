import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';

export default function Home() {

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
        <View style={styles.contentUser} delay={600}>
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
      </View>
      <View style={styles.card}>
        <View style={styles.cardUser} delay={600}>
          <View style={styles.contentCardUser}>
            <Text style={styles.titleCard}>CNS: 197 3149 4882 0004</Text>  
            <Image 
              source={require('../../assets/logo_saudedvdd_brancov.png')}
              style={{ width: '38%' }}
              resizeMode='contain'
            />
          </View>
        </View>
        <View style={styles.contentCardUserInfo}>
          <Text style={styles.titleInfo}>GUILHERME PEREIRA LIMA</Text>  
          <Text style={styles.titleInfo}>CPF: 785.345.995-00</Text>  
          <Text style={styles.titleInfo}>Cartão Municipal: 18700925467</Text>  
          <Text style={styles.titleDate}>Data Emissão: 14/01/2023</Text>  
        </View>
      </View>
      <View style={styles.containerMain}>
        <View style={styles.contentUser} delay={600}>
          <Text style={styles.titleUser}>Pincipais Opções</Text>  
        </View>
        {/* <View style={styles.containerButtons}>
          <TouchableOpacity 
          style={styles.button} 
          onPress={ () => navigation.navigate('Schedule') }>
            <Text style={styles.buttonText}>Meus Agendamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button} 
          onPress={ () => navigation.navigate('ExamResults') }>
            <Text style={styles.buttonText}>Resultados de Exames</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button} 
          onPress={ () => navigation.navigate('HealthUnit') }>
            <Text style={styles.buttonText}>Unidade de Saúde</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button} 
          onPress={ () => navigation.navigate('Profile') }>
            <Text style={styles.buttonText}>Meu Usuário</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.containerButtons}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ScheduleStack')}>
              <Text style={styles.buttonText}>Meus Agendamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ExamResults')}>
              <Text style={styles.buttonText}>Resultados de Exames</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('HealthUnit')}>
              <Text style={styles.buttonText}>Unidade de Saúde</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.buttonText}>Meu Usuário</Text>
            </TouchableOpacity>
          </View>
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
  card: {
    margin: '4%',
    marginTop: '0%',
    backgroundColor: 'rgb(0, 176, 243)',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  cardUser: {
    marginTop: -15,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomWidth: 1,
  },
  contentCardUser: {
    marginBottom: -10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentCardUserInfo: {
    marginTop: 20,
    marginBottom: 10
  },
  
  titleCard: {
    fontSize: 17,
    fontWeight: 'bold',
    fontWeight: 300,
    color: '#fff'
  },
  titleInfo: {
    fontSize: 17,
    fontWeight: 'bold',
    fontWeight: 300,
    color: '#fff',
    marginBottom: 2,
  },

  titleDate: {
    textAlign: 'right',
    fontSize: 17,
    fontWeight: 'bold',
    fontWeight: 300,
    color: '#fff',
  },

  containerMain: {
    margin: '6%',
    marginTop: 10,
  },

  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  button: {
    backgroundColor: 'rgba(32, 48, 117, 1)',
    width: 173,
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 700,
    textAlign: 'center',
    color: '#fff',
  },
});
