import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from 'features/user/views/profile';
import { EndWorkQR } from '../end-work';

export type SellerProfileStackParamList = {
  SellerDefaultProfile: undefined;
  SellerEndWork: undefined
};

const Stack = createStackNavigator<SellerProfileStackParamList>();

const SellerProfile = () => {
  return (
    <Stack.Navigator initialRouteName='SellerDefaultProfile' screenOptions={{ headerShown: true }}>
      <Stack.Screen name="SellerDefaultProfile" component={UserProfile} options={{ headerTitle: 'Профиль' }} />
      <Stack.Screen name="SellerEndWork" component={EndWorkQR} options={{ headerTitle: 'Скан QR кода' }} />
    </Stack.Navigator>
  );
};

export default SellerProfile;