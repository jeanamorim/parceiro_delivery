import React, {useState} from 'react';
import {View} from 'react-native';
import {StatusBar, StyleSheet, Platform} from 'react-native';
import Background from '../../components/Background';
import {WebView} from 'react-native-webview';
// import { Container } from './styles';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function Site() {
  const [url, setUrl] = useState(
    'https://www.portalmeiempreendedor.com/abrir-mei/',
  );
  const [go, setGo] = useState(false);
  return (
    <Background>
      <MyStatusBar backgroundColor="#F4A460" barStyle="light-content" />
      <WebView source={{uri: url}} style={{marginTop: 20}} />
    </Background>
  );
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 55 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 64 : 76;
const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 14,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#F4A460',
    height: APPBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
  separator: {
    marginLeft: 10,
    marginRight: 3,
    marginTop: 2,
  },
  separatorEstab: {
    marginLeft: 10,
    marginRight: 3,
    marginTop: 10,
  },
  textseparator: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
