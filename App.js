import { Fragment, React } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'

export default function App() {
  return (
  <Fragment>
    <SafeAreaView style={{ flex: 0, backgroundColor: '#179ee8' }} />
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavigationContainer>
        <StatusBar backgroundColor="#179ee8" barStyle="light-content"/>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  </Fragment>
  );
}