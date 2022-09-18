import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIonicIcon } from 'components/TabBarIcon';
import { TabBarLabel } from 'components/TabBarLabel';
import UserProfile from 'features/user/views/profile';
import Cart from './navigators/Cart';
import { Statistics } from './navigators/Statistics';

export type SellerTabParamList = {
  SellerProfile: undefined;
  SellerOrder: undefined;
  SellerSales: undefined;
};

const Tab = createBottomTabNavigator<SellerTabParamList>();

const Seller = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: true, }}>
      <Tab.Screen name="SellerProfile" component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='person-sharp' defaultIcon='person-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Профиль" />,
          headerTitle: "Профиль"
        }} />
      <Tab.Screen name="SellerOrder" component={Cart}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='add-circle' defaultIcon='add-circle-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Заказ" />,
          headerShown: false
        }} />
      <Tab.Screen name="SellerSales" component={Statistics}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='bar-chart-sharp' defaultIcon='bar-chart-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Продажи" />,
          headerTitle: "Продажи"
        }} />
    </Tab.Navigator>
  );
};

export default Seller;
