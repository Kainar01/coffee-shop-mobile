import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIonicIcon } from 'components/TabBarIcon';
import { TabBarLabel } from 'components/TabBarLabel';
import UserProfile from 'features/user/views/profile';
import SellerList from './views/seller-list ';
import Statistics from './views/statistics';

export type FranchiseTabParamList = {
  Профиль: undefined;
  Персонал: undefined;
  Продажи: undefined;
};

const Tab = createBottomTabNavigator<FranchiseTabParamList>();

const Franchise = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: true, }}>
      <Tab.Screen name="Профиль" component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='person-sharp' defaultIcon='person-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Профиль" />,
        }} />
      <Tab.Screen name="Персонал" component={SellerList}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='person-add-sharp' defaultIcon='person-add-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Персонал" />,
        }} />
      <Tab.Screen name="Продажи" component={Statistics}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='bar-chart-sharp' defaultIcon='bar-chart-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Продажи" />,
        }} />
    </Tab.Navigator>
  );
};

export default Franchise;
