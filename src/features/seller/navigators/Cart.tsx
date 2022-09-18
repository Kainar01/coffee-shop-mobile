import { createStackNavigator } from '@react-navigation/stack';
import UserCart, { CartItem } from '../views/user-cart';
import UserCheckout from '../views/user-checkout';
import UserQR from '../views/user-qr';

export type SellerCartStackParamList = {
  UserQR: undefined;
  UserCart: {
    username: string
  };
  UserCheckout: {
    cartItems: Array<CartItem>
    total: number
    username: string
    discount: number
  }
};

const Stack = createStackNavigator<SellerCartStackParamList>();

const Cart = () => {
  return (
    <Stack.Navigator initialRouteName='UserQR' screenOptions={{ headerShown: true }}>
      <Stack.Screen name="UserQR" component={UserQR} options={{ headerTitle: 'Идентификация пользователя' }} />
      <Stack.Screen name="UserCart" component={UserCart} options={{ headerTitle: 'Корзина пользователя' }} />
      <Stack.Screen name="UserCheckout" component={UserCheckout} options={{ headerTitle: 'Оформление заказа' }} />
    </Stack.Navigator>
  );
};

export default Cart;