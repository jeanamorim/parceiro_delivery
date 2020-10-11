/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {formatPrice} from '../../../util/format';

import {View, Text, StyleSheet, Dimensions} from 'react-native';

var deviceWidth = Dimensions.get('window').width;

export default function Pedidos({navigation, item}) {
  return (
    <View style={styles.card}>
      <View style={styles.footer}>
        <Text> {item.timeDistance}</Text>
      </View>
      <View style={styles.footer1}>
        <Text> {item.ship_neighborhood}</Text>
        <Text>{item.payment_method}</Text>
      </View>

      <View style={styles.footer2}>
        <Text>{item.order_details.length} itens</Text>
        <Text>{item.ship_street}</Text>
      </View>

      <View style={styles.footer3}>
        <Text> #{item.id}</Text>
        <Text>{formatPrice(item.total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
