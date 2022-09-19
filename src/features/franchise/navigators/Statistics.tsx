import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import franchiseApi from 'api/franchise/api';
import { PurchaseStatus } from 'api/seller/types';
import { PurchaseList } from 'features/seller/views/statistics/PurchaseList';
import { useAuth } from 'hooks/useAuth';
import { FranchiseStatistics } from '../views/sales-statistics';

export interface StatisticsParamList {
  FranchiseStats: undefined
  FranchisePurchases: undefined
}

const Tab = createMaterialTopTabNavigator();

export const Statistics = () => {
  const { user } = useAuth();

  const franchiseId = user?.franchise?.id as number

  const { data: purchases } = franchiseApi.endpoints.getFranchisePurchases.useQuery(franchiseId, { skip: !franchiseId })

  const donePurchases = purchases?.filter(purchase => purchase.status === PurchaseStatus.PAID) || []

  return (
    <Tab.Navigator initialRouteName='FranchiseStats' screenOptions={{ tabBarIndicatorStyle: { backgroundColor: 'black' } }}>
      <Tab.Screen name="FranchiseStats" component={FranchiseStatistics} options={{ tabBarLabel: "Статистика" }} />
      <Tab.Screen name="FranchisePurchases" options={{ tabBarLabel: "Завершенные Заказы" }} >
        {(props) => <PurchaseList seller {...props} purchases={donePurchases} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}