import { createStackNavigator } from '@react-navigation/stack';
import AuthType from './components/auth-type';
import GuestAuth from './components/guest';
import UserAuth from './components/user';

export type AuthStackParamList = {
  AuthType: undefined;
  AuthGuest: undefined;
  AuthUser: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="AuthType" component={AuthType} />
      <Stack.Screen name="AuthGuest" component={GuestAuth} />
      <Stack.Screen name="AuthUser" component={UserAuth} />
    </Stack.Navigator>
  );
};

export default Auth;