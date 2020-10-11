/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useMemo} from 'react';
import {formatPrice} from '../../util/format';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {parseISO, formatDistanceStrict} from 'date-fns';
import socketio from 'socket.io-client';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';
var deviceWidth = Dimensions.get('window').width;

import Background from '../../components/Background';
import Pendentes from '../../components/Pedidos/Pendentes';
import {Container, Content, Card, ButtonClose, Status} from './styles';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function Pedidos({navigation}) {
  const [pendente, setPendente] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date] = useState(new Date());
  const profile_id = useSelector((state) => state.user.profile.id);
  const socket = useMemo(
    () =>
      socketio('https://backend-delivery.herokuapp.com', {
        query: {profile_id},
      }),
    [profile_id],
  );
  useEffect(() => {
    socket.on('new-order', (data) => {
      setPendente([...pendente, data]);
      Alert.alert('Novo pedido');
    });
  }, [pendente, socket]);

  async function pendentes() {
    setLoading(true);
    const response = await api.get('orders', {
      params: {date},
    });
    const data = response.data.map((item) => ({
      ...item,
      timeDistance: formatDistanceStrict(parseISO(item.date), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));
    const pendentes = data.filter((item) => item.status === 'PENDENTE');
    setPendente(pendentes);
    setLoading(false);
  }

  useEffect(() => {
    pendentes();
  }, [date]);
  return (
    <>
      <Background>
        <MyStatusBar backgroundColor="#F4A460" barStyle="light-content" />

        <View style={styles.appBar}>
          <Icon
            name="chevron-left"
            size={33}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.header}>Pedidos</Text>
          <Icon name="refresh-cw" size={26} color="#000" />
        </View>

        <View style={styles.container}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.view}>
              <View style={styles.status}>
                <Icon name="clipboard" size={26} color="#000" />
                <Text style={styles.headerText}>Pendentes</Text>
              </View>
              {loading ? (
                <View>
                  <ActivityIndicator size={40} color="#F4A460" />
                  <Text>Carregando...</Text>
                </View>
              ) : (
                <FlatList
                  data={pendente}
                  width={deviceWidth}
                  marginLeft={8}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({item}) => (
                    <Pendentes item={item} navigation={navigation} />
                  )}
                />
              )}
            </View>

            <View style={styles.view}>
              <View style={styles.status}>
                <Icon name="check-circle" size={26} color="#000" />
                <Text style={styles.headerText}>Produzindo</Text>
              </View>
            </View>

            <View style={styles.view}>
              <View style={styles.status}>
                <Icon name="truck" size={26} color="#000" />
                <Text style={styles.headerText}>Enviados</Text>
              </View>
            </View>

            <View style={styles.view}>
              <View style={styles.status}>
                <Icon name="check" size={26} color="#000" />
                <Text style={styles.headerText}>Entregues</Text>
              </View>
            </View>
            <View style={styles.view}>
              <View style={styles.status}>
                <Icon name="x-square" size={26} color="#000" />
                <Text style={styles.headerText}>Cancelados</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Background>
    </>
  );
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 55 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 64 : 76;

const styles = StyleSheet.create({
  header: {
    color: '#F4A460',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#fff',
    height: APPBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    padding: 0,
  },
  view: {
    width: deviceWidth,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 1,
    alignItems: 'center',
  },
  status: {
    flexDirection: 'row',
    marginTop: 10,
  },
  card: {
    width: '98%',
    borderWidth: 3,
    borderColor: '#F4A460',
    borderRadius: 5,
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4A460',
    height: 25,
  },
  footer1: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  footer2: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  footer3: {
    marginTop: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
});
