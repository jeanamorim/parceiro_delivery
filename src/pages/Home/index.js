/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {signOut} from '../../store/modules/auth/actions';
import Background from '../../components/Background';

import {
  Container,
  Content,
  Card,
  ButtonClose,
  Status,
  ContainerCards,
} from './styles';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function Home({navigation}) {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <MyStatusBar backgroundColor="#F4A460" barStyle="light-content" />
      <Container>
        <View style={styles.appBar}>
          <Icon name="refresh-cw" size={30} color="#fff" />
          <Text style={styles.header}>Parceiro delivery</Text>
          <Image
            source={{
              uri: profile.image.url,
            }}
            style={styles.image}
          />
        </View>
        <Status>
          <Text style={{marginTop: 5, color: '#fff', fontWeight: 'bold'}}>
            Fechado
          </Text>
        </Status>
        <ContainerCards>
          <Content>
            <Card onPress={() => navigation.navigate('Pedidos')}>
              <Icon name="shopping-bag" size={35} color="#fff" />
              <Text style={styles.text}>Pedidos</Text>
            </Card>
            <Card>
              <Icon name="trending-up" size={35} color="#fff" />
              <Text style={styles.text}>Caixa</Text>
            </Card>
          </Content>
          <Content>
            <Card>
              <Icon name="settings" size={35} color="#fff" />
              <Text style={styles.text}>Ajustes</Text>
            </Card>
            <Card onPress={() => navigation.navigate('Site')}>
              <Icon name="shopping-cart" size={35} color="#fff" />
              <Text style={styles.text}>Total pedidos</Text>
            </Card>
          </Content>
        </ContainerCards>

        <ButtonClose onPress={() => handleSignOut()}>Sair</ButtonClose>
      </Container>
    </>
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
