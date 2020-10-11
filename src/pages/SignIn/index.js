import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, StatusBar, View, StyleSheet, Platform} from 'react-native';

//import translate from '../../locales';
//import SignInForm from '../../forms/SignInForm';

import Background from '../../components/Background';
import {signInRequest} from '../../store/modules/auth/actions';

import logo from '../../assets/delivery14.png';

import {
  Container,
  FormContainer,
  SignLink,
  SignLinkText,
  Input,
  SubmitButton,
} from './styles';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function SignIn({navigation}) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
    setEmail('');
    setPassword('');
  }

  return (
    <Background>
      <MyStatusBar backgroundColor="#F4A460" barStyle="light-content" />
      <Container>
        <Image source={logo} />
        <FormContainer loading={loading}>
          <Input
            icon="envelope"
            keyboardType="email-address"
            placeholder="Sua conta"
            autoCapitalize="none"
            autoCorrect={false}
            ref={emailRef}
            onChangeText={setEmail}
            //onBlur={() => onBlur('email')}
            value={email}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            icon="lock"
            secureTextEntry
            placeholder="Sua senha"
            ref={passwordRef}
            onChangeText={setPassword}
            //onBlur={() => onBlur('password')}
            value={password}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton onPress={handleSubmit} loading={loading}>
            Acessar conta
          </SubmitButton>
        </FormContainer>
      </Container>
    </Background>
  );
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 55 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#F4A460',
    height: APPBAR_HEIGHT,
  },
});
