import styled from 'styled-components/native';
import Button from '../../components/Button';
import {RectButton} from 'react-native-gesture-handler';
export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const ContainerCards = styled.View`
  flex: 1;
  margin-top: 30px;
`;
export const Title = styled.Text`
  align-self: center;
  font-size: 25px;
  color: #fff;
  font-weight: bold;
`;

export const Card = styled(RectButton)`
  background: #f0a560;
  border-radius: 4px;
  padding: 40px;
  flex: 1;
  align-items: center;
  margin: 10px 10px 10px 10px;

  elevation: 5;
`;
export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;
export const ButtonClose = styled(Button)`
  align-self: stretch;
  height: 60px;
`;
export const Status = styled.View`
  align-items: center;
  margin-top: 30px;
  background: #f9735b;
  height: 30px;
  margin-left: 110px;
  margin-right: 110px;
  border-radius: 20px;
`;
