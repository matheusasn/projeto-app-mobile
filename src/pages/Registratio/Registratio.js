import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { CommonActions } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Registration() {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [quantidadeDependentes, setQuantidadeDependentes] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [smsCode, setSmsCode] = useState('');

  const navigation = useNavigation();

  const handleSendSms = () => {
    // Aqui você pode implementar a lógica para enviar o SMS, por exemplo, chamando uma API
    setModalVisible(true);
    // Exemplo de chamada à API para enviar o SMS
    // api
    //   .post('/send-sms', { phoneNumber: celular }) // Substitua pelo endpoint e dados reais
    //   .then(response => {
    //     // SMS enviado com sucesso
    //     setModalVisible(true);
    //   })
    //   .catch(error => {
    //     Alert.alert('Erro', 'Ocorreu um erro ao enviar o SMS.');
    //     console.error(error);
    //   });
  };

  const handleConfirmSms = () => {
    // Aqui você pode implementar a lógica para verificar o código do SMS, por exemplo, chamando uma API

    // Verificação do código do SMS
    if (smsCode === '1234') {
      // Pré-cadastro realizado com sucesso
      ToastAndroid.show('Pré-cadastro realizado com sucesso! (Aguarde ativação do seu cadastro)', ToastAndroid.SHORT);

      // Navegar para a tela de SignIn
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        })
      );
    } else {
      Alert.alert('Erro', 'Código de SMS inválido. Por favor, tente novamente.');
    }

    // Fechar o modal e limpar o código do SMS
    setModalVisible(false);
    setSmsCode('');
  };

  const handleRegister = () => {
    // Aqui você pode realizar a validação dos campos e enviar os dados para a API

    // Exemplo de validação simples
    // if (nome === '') {
    //   Alert.alert('Erro', 'O campo nome é obrigatório.');
    //   return;
    // }

    // Exemplo de chamada à API
    // api
    //   .post('/register', {
    //     nome,
    //     sexo,
    //     dataNascimento,
    //     cpf,
    //     nomeMae,
    //     quantidadeDependentes,
    //     estadoCivil,
    //     email,
    //     celular,
    //     cep,
    //     senha,
    //   })
    //   .then(response => {
    //     // Salvar informações do usuário no armazenamento local
    //     saveUserInfo(response.data);

    //     // Navegar para a próxima tela (por exemplo, tela de boas-vindas)
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [{ name: 'WelcomeScreen' }],
    //       })
    //     );
    //   })
    //   .catch(error => {
    //     Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro.');
    //     console.error(error);
    //   });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bem-vindo(a)</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Realize seu Pré-Cadastros</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Sexo"
            value={sexo}
            onChangeText={setSexo}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChangeText={setDataNascimento}
          />
          <TextInputMask
            type="cpf"
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome da Mãe"
            value={nomeMae}
            onChangeText={setNomeMae}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade de Dependentes"
            value={quantidadeDependentes}
            onChangeText={setQuantidadeDependentes}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado Civil"
            value={estadoCivil}
            onChangeText={setEstadoCivil}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInputMask
            type="cel-phone"
            options={{ maskType: 'BRL', withDDD: true, dddMask: '+99' }}
            style={styles.input}
            placeholder="Celular"
            value={celular}
            onChangeText={setCelular}
            keyboardType="phone-pad"
          />
          <TextInputMask
            type="zip-code"
            style={styles.input}
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha de Acesso"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSendSms}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite o código SMS</Text>
            <TextInput
              style={styles.smsInput}
              placeholder="Código SMS"
              value={smsCode}
              onChangeText={setSmsCode}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleConfirmSms}>
              <Text style={styles.modalButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#179ee8',
  },
  headerContainer: {
    marginTop: '14%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#179ee8',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#179ee8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smsInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#179ee8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
