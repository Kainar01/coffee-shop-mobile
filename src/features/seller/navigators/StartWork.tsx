import { createStackNavigator } from '@react-navigation/stack';
import { AuthSeller } from 'features/auth/auth.interface';
import { StartWork } from '../components/StartWork';
import { StartWorkQR } from '../views/start-work-qr';

export type SellerStartWorkStackParamList = {
  PreStartWork: undefined;
  StartWork: undefined
};

const Stack = createStackNavigator<SellerStartWorkStackParamList>();

type Props = {
  seller: AuthSeller
}

const StartWorkNavigator = ({ seller }: Props) => {
  return (
    <Stack.Navigator initialRouteName='PreStartWork' screenOptions={{ headerShown: true }}>
      <Stack.Screen name="PreStartWork" options={{ headerTitle: 'Начало работы' }} >
        {(props) => <StartWork {...props} seller={seller} />}
      </Stack.Screen>
      <Stack.Screen name="StartWork" component={StartWorkQR} options={{ headerTitle: 'Скан QR кода' }} />
    </Stack.Navigator>
  );
};

export default StartWorkNavigator;