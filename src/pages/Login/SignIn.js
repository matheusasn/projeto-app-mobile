import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { saveUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';
import { TextInputMask } from 'react-native-masked-text';
import { CommonActions } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cpf, setCPF] = useState('');
  const [cns, setCNS] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const formatted_csn  = cns.replace(/\s+/g, '')

      const formData = new FormData();
      formData.append('cpf', "088.045.924-78");
      formData.append('cns', "000000001");

      const response = await fetch('https://demojc.sistemasjc.com.br/api/app/logar', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (!data.status){
        throw Error()
      }
      
      const mock = {
          "id": "1",
          "name": "Guilherme Lima",
          "name_completo": "GUILHERME PEREIRA LIMA",
          "cns": "00000001",
          "cartao_municipal": "18700925467",
          "cpf": "785.345.995-00",
          "city_card": "2222222222",
          "issue_date": "10/12/2022"
      }
      await saveUserInfo({...data, ...mock});
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        })
      );
    } catch (error) {
      Alert.alert('Usuário não encontrado', 'CPF ou CNS Inválidos', [
        {
          text: 'Ok',
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerForm} animation="fadeInUp">
        <Text style={styles.title}>CPF</Text>
        <TextInputMask
          type="cpf"
          placeholder="Digite seu CPF"
          style={styles.input}
          value={cpf}
          keyboardType="numeric"
          onChangeText={(formatted, extracted) => setCPF(formatted)}
        />

        <Text style={styles.title}>CNS</Text>
        <TextInputMask
          type="custom"
          options={{
            mask: '999 9999 9999 9999',
          }}
          placeholder="Digite seu CNS"
          style={styles.input}
          value={cns}
          keyboardType="numeric"
          onChangeText={(formatted, extracted) => setCNS(formatted)}
        />

        <TouchableOpacity style={styles.button} disabled={loading} onPress={handleLogin}>
          <Text style={styles.buttonText}>{loading ? <Load /> : 'Entrar'}</Text>
        </TouchableOpacity>

        <View style={styles.divTitlePreCadastro}>
          <TouchableOpacity 
          onPress={ () => navigation.navigate('Registratio') }>
            <Text style={styles.titlePreCadastro}>Realizar Pré-cadastro</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#179ee8',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 24,
    marginTop: 28,
  },
  divTitlePreCadastro: {
    alignItems: 'center'
  },
  titlePreCadastro: {
    marginTop: 28,
    fontSize: 15,
    fontWeight: 300,
    color: '#666666',
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#179ee8',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
