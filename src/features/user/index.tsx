import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIonicIcon } from 'components/TabBarIcon';
import { TabBarLabel } from 'components/TabBarLabel';
import SellerOrder from './views/order';
import SellerProfile from './views/profile';
import { Statistics } from './views/statistics';

export type SellerTabParamList = {
  UserProfile: undefined;
  UserOrder: undefined;
  UserPurchase: undefined;
  UserFavorite: undefined;
};

const Tab = createBottomTabNavigator<SellerTabParamList>();

const UserScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: true, }}>
      <Tab.Screen name="UserProfile" component={SellerProfile}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='person-sharp' defaultIcon='person-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Профиль" />,
          headerTitle: 'Профиль'
        }} />
      <Tab.Screen name="UserOrder" component={SellerOrder}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='add-circle' defaultIcon='add-circle-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Заказ" />,
          headerTitle: 'Заказы'
        }} />
      <Tab.Screen name="UserPurchase" component={Statistics}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='bar-chart-sharp' defaultIcon='bar-chart-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Покупки" />,
          headerTitle: 'Покупки'
        }} />
    </Tab.Navigator>
  );
};

export default UserScreen;
