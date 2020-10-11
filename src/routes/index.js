/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Pedidos from '../pages/Pedidos';
import OrderDetails from '../pages/Pedidos/Visualizar';
import Site from '../pages/Site';



// import App from './App';
const Stack = createStackNavigator();
import {useSelector} from 'react-redux';
export default function Index() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer>
    <Stack.Navigator headerMode="none">
    {signed === true ? (
       <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Site" component={Site} />
          <Stack.Screen name="Pedidos" component={Pedidos} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </>


        ) : (
          <Stack.Screen name="SignIn" component={SignIn} />
          )}

    </Stack.Navigator>
  </NavigationContainer>
  );
}
