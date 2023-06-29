import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';
import { CommonActions } from '@react-navigation/native';

export default function Profile() {

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

  if (loading)
    return <Load />

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
      </View>
      <View style={styles.containerMain}>
        <View style={styles.contentUser}>
          <Text style={styles.titleUser}>Meu Usuário</Text>
        </View>
        <Text style={styles.textPersonal}>Dados Pessoais</Text>
        <Text style={styles.textOption}>Nome: <Text style={styles.captionUser}>Guilherme Pereira Lima</Text></Text>
        <Text style={styles.textOption}>Nome Social / Apelido: <Text style={styles.captionUser}>Guilherme</Text></Text>
        <Text style={styles.textOption}>Data Nascimento: <Text style={styles.captionUser}>19/11/1993</Text></Text>
        <Text style={styles.textOption}>Tipo Sanguíneo: <Text style={styles.captionUser}>O+</Text></Text>
        <Text style={styles.textOption}>Endereço: <Text style={styles.captionUser}>Rua João Quirino, nº100, Catolé, Campina Grande - PB</Text></Text>
        <Text style={styles.textPersonal}>Documentos</Text>
        <Text style={styles.textOption}>CPF: <Text style={styles.captionUser}>785.345.995-00</Text></Text>
        <Text style={styles.textOption}>RG: <Text style={styles.captionUser}>9874563</Text></Text>
        <Text style={styles.textOption}>CNS: <Text style={styles.captionUser}>197 3149 4882 0004</Text></Text>
        <Text style={styles.textOption}>Cartão Municipal: <Text style={styles.captionUser}>18700925467</Text></Text>
        <Text style={styles.textPersonal}>Filiação</Text>
        <Text style={styles.textOption}>Nome da Mãe: <Text style={styles.captionUser}>Maria Almeida Lima</Text></Text>
        <Text style={styles.textOption}>Nome do Pai: <Text style={styles.captionUser}>Carlos Silva Pereira</Text></Text>
        <View style={styles.containerAttention}>
          <Text style={styles.textPersonalAttention}>ATENÇÃO</Text>
          <Text style={styles.textAttention}>Caso identifique alguma divergência, procurar a UBS mais próxima para corrigi-la. A divergência de dados pode dificultar a marcação de consultas e exames.</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            })
          )}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

      </View>
    </Animatable.View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#179ee8',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
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

  textPersonal: {
    fontSize: 17,
    fontWeight: 700,
    color: '#666666',
    marginTop: 10,
    marginBottom: 10,
  },

  textOption: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight: 700,
    marginTop: 2,
    marginBottom: 2,
  },

  titleInfo: {
    fontSize: 17,
    fontWeight: 'bold',
    fontWeight: 300,
    color: '#fff',
    marginBottom: 2,
  },

  containerAttention: {
    padding: 20,
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
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }

});