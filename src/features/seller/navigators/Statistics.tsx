import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import sellerApi from 'api/seller/api';
import { PurchaseStatus } from 'api/seller/types';
import { useAuth } from 'hooks/useAuth';
import _ from 'lodash';
import { PurchaseList } from '../views/statistics/PurchaseList';

export interface StatisticsParamList {
  Pending: undefined
  Done: undefined
}

const Tab = createMaterialTopTabNavigator();

export const Statistics = () => {
  const { user } = useAuth();
  const { data: purchases } = sellerApi.endpoints.getSellerPurchases.useQuery(user!.seller!.id, { skip: !user?.seller?.id })

  const data = _.groupBy(purchases, 'status')

  console.log(data)
  const donePurchases = data[PurchaseStatus.PAID] || []
  const pendingPurchases = data[PurchaseStatus.PENDING] || []
  return (
    <Tab.Navigator screenOptions={{ tabBarIndicatorStyle: { backgroundColor: 'black' } }}>
      <Tab.Screen name="Pending" options={{ tabBarLabel: "В процессе" }} >
        {(props) => <PurchaseList {...props} purchases={pendingPurchases} />}
      </Tab.Screen>
      <Tab.Screen name="Done" options={{ tabBarLabel: "Завершенные" }} >
        {(props) => <PurchaseList {...props} purchases={donePurchases} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}