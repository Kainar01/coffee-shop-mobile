import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIonicIcon } from 'components/TabBarIcon';
import { TabBarLabel } from 'components/TabBarLabel';
import { useAuth } from 'hooks/useAuth';
import Cart from './navigators/Cart';
import StartWorkNavigator from './navigators/StartWork';
import { Statistics } from './navigators/Statistics';
import SellerProfile from './views/profile';

export type SellerTabParamList = {
  SellerProfile: undefined;
  SellerOrder: undefined;
  SellerSales: undefined;
};

const Tab = createBottomTabNavigator<SellerTabParamList>();

const Seller = () => {
  const { user } = useAuth();

  const isFinishedWork = user?.seller && user.seller.workingTrack && user.seller.workingTrack.endDate

  const canStartWork = user?.seller && user.seller.workingTrack !== null && !isFinishedWork

  return (
    <>
      {canStartWork ?
        <Tab.Navigator screenOptions={{ tabBarShowLabel: true, }}>
          <Tab.Screen name="SellerProfile" component={SellerProfile}
            options={{
              tabBarIcon: ({ focused }) => <TabBarIonicIcon focused={focused} focusedIcon='person-sharp' defaultIcon='person-outline' />,
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Профиль" />,
              headerShown: false
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
        </Tab.Navigator> : user?.seller && <StartWorkNavigator seller={user.seller} />}
    </>);
};

export default Seller;
