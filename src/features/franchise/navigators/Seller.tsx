import { createStackNavigator } from '@react-navigation/stack';
import SellerList from '../views/seller-list ';
import { SellerWorkStats } from '../views/seller-stats';

export type FranchiseSellerStackParamList = {
  SellerList: undefined;
  SellerStats: {
    sellerId: number;
  };
};

const Stack = createStackNavigator<FranchiseSellerStackParamList>();

const Seller = () => {
  return (
    <Stack.Navigator initialRouteName='SellerList' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SellerList" component={SellerList} />
      <Stack.Screen name="SellerStats" component={SellerWorkStats} />
    </Stack.Navigator>
  );
};

export default Seller;