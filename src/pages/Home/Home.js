import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
// import BeautyWebView from 'react-native-beauty-webview';

import { useNavigation } from '@react-navigation/native';
import { loadUserInfo } from '../../libs/storage';
import { Load } from '../../components/Load';

export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [webViewVisible, setWebViewVisible] = useState(false);

  const openWebView = () => {
    setWebViewVisible(true);
  };

  const closeWebView = () => {
    setWebViewVisible(false);
  };

  useEffect(() => {
    async function loadStoragedData() {
      const userInfo = await loadUserInfo();
      setInfo(userInfo);
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  if (loading) return <Load />;

  let WebViewComponent;

  // try {
  //   WebViewComponent = (
  //     <BeautyWebView
  //       visible={webViewVisible}
  //       onPressClose={closeWebView}
  //       url="https://conectesus-paciente.saude.gov.br/"
  //       extraMenuItems={[
  //         {
  //           title: 'Site JC Soft',
  //           onPress: () => Linking.openURL("http://sistemasjc.com.br"),
  //         },
  //       ]}
  //     />
  //   );
  // } catch (error) {
  //   console.log(error);
  //   WebViewComponent = <Text>Oops, algo deu errado.</Text>;
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View style={styles.content} animation="fadeInUp">
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
        <View style={styles.card}>
          <View style={styles.cardUser}>
            <View style={styles.contentCardUser}>
              <View style={styles.contentCardUserInfo}>
                <Text style={styles.titleInfo}>GUILHERME PEREIRA LIMA</Text>
                <Text style={styles.titleInfo}>N. Social / Apelido: GUILHERME</Text>
                <Text style={styles.titleCard}>Data Nasc.: 19/11/1993</Text>
              </View>
              <Image
                source={require('../../assets/icon_sus.png')}
                style={{ width: '20%' }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.titleDate}>Sexo: M</Text>
          </View>
          <View style={styles.contentCardUserInfo}>
            <Text style={styles.titleInfoCNS}>197 3149 4882 0004</Text>
          </View>
        </View>
        <View style={styles.containerMain}>
          <View style={styles.contentUser}>
            <Text style={styles.titleUser}>Principais Opções</Text>
          </View>
          <View style={styles.containerButtons}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ScheduleStack')}
              >
                <Text style={styles.buttonText}>Meus Agendamentos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ExamResults')}
              >
                <Text style={styles.buttonText}>Resultados de Exames</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('HealthUnit')}
              >
                <Text style={styles.buttonText}>Unidade de Saúde</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.buttonText}>Meu Usuário</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              {/* <TouchableOpacity style={styles.button} onPress={openWebView}>
                <Text style={styles.buttonText}>Cartão de Vacina do Cidadão</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.buttonText}>Passaporte COVID-19</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        {/* {WebViewComponent} */}
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    marginHorizontal: '6%',
    marginTop: 10,
  },
  containerUser: {
    marginTop: 40,
  },
  contentUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleUser: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 34,
    fontWeight: '700',
  },
  captionUser: {
    color: 'rgba(32, 48, 117, 1)',
    fontStyle: 'normal',
    fontSize: 17,
    fontWeight: '300',
  },
  card: {
    marginTop: '4%',
    backgroundColor: '#3a3937',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentCardUserInfo: {
    marginTop: 20,
    marginBottom: 10,
  },
  titleCard: {
    fontSize: 17,
    fontWeight: 'bold',
    fontWeight: '300',
    color: '#fff',
  },
  titleInfo: {
    fontSize: 17,
    fontWeight: 'bold',
    fontWeight: '300',
    color: '#fff',
    marginBottom: 2,
  },
  titleInfoCNS: {
    fontSize: 30,
    fontWeight: 'bold',
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
    textAlign: 'center',
  },
  titleDate: {
    textAlign: 'right',
    fontSize: 17,
    fontWeight: 'bold',
    fontWeight: '300',
    color: '#fff',
  },
  containerMain: {
    marginTop: 10,
  },
  containerButtons: {
    marginTop: 15,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
});
