import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';



export default function Welcome() {

  const navigation = useNavigation();

  return (
    <Animatable.View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image 
          animation="flipInY"
          source={require('../../assets/logo_saudedvdd_brancov.png')}
          style={{ width: '100%' }}
          resizeMode='contain'
        />
        <Animatable.Text animation="flipInY" style={styles.textJC}>Sistema JC - Gestão em Saúde</Animatable.Text>
      </View>

      <Animatable.View  style={styles.containerForm} delay={600} animation="fadeInUp">
        <Text style={styles.title}>Seja Bem-Vindo!</Text>
        <Text style={styles.text}>Faça o login para começar</Text>

        <TouchableOpacity 
        style={styles.button} 
        onPress={ () => navigation.navigate('SignIn') }>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#179ee8',
  },

  containerLogo: {
    flex:2,
    backgroundColor: '#179ee8',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textJC: {
    color: '#fff',
  },

  containerForm: {
    flex:1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },

  text: {
    color: '#A1A1A1'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#179ee8',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }

})