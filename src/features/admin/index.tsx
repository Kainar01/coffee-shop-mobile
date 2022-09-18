import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIonicIcon, TabBarMaterialCommunityIcon } from 'components/TabBarIcon';
import { TabBarLabel } from 'components/TabBarLabel';
import UserProfile from 'features/user/views/profile';
import React from 'react';
import AdminFranchise from './navigators/Franchise';
import AdminItems from './navigators/Items';

export type AdminTabParamList = {
  Франшизы: undefined;
  Продукты: undefined;
  Профиль: undefined;
};

const Tab = createBottomTabNavigator<AdminTabParamList>();

const Admin = () => {
  return (
    <Tab.Navigator initialRouteName='Франшизы' screenOptions={{ tabBarShowLabel: true }}>
      < Tab.Screen name="Профиль" component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='person-sharp' defaultIcon='person-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Профиль" />,
          headerTitle: 'Профиль'
        }} />
      <Tab.Screen name="Франшизы" component={AdminFranchise}
        options={{
          tabBarIcon: ({ focused }) => <TabBarMaterialCommunityIcon focused={focused} focusedIcon='store' defaultIcon='store-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Франшизы" />,
          headerShown: false
        }} />
      < Tab.Screen name="Продукты" component={AdminItems}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='list' defaultIcon='list-outline' />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Продукты" />,
          headerShown: false
        }} />
    </Tab.Navigator >
  );
};

export default Admin;
