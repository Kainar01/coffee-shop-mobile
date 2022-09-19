import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import sellerApi from 'api/seller/api';
import { PurchaseStatus } from 'api/seller/types';
import { useAuth } from 'hooks/useAuth';
import _ from 'lodash';
import { PurchaseList } from '../views/statistics/PurchaseList';

export interface StatisticsParamList {
  SellerPendingPurchase: undefined
  SellerDonePurchase: undefined
}

const Tab = createMaterialTopTabNavigator();

export const Statistics = () => {
  const { user } = useAuth();

  const sellerId = user?.seller?.id as number

  const { data: purchases } = sellerApi.endpoints.getSellerPurchases.useQuery(sellerId, { skip: !sellerId })

  const data = _.groupBy(purchases, 'status')

  const donePurchases = data[PurchaseStatus.PAID] || []
  const pendingPurchases = data[PurchaseStatus.PENDING] || []

  return (
    <Tab.Navigator initialRouteName='SellerPendingPurchase' screenOptions={{ tabBarIndicatorStyle: { backgroundColor: 'black' } }}>
      <Tab.Screen name="SellerPendingPurchase" options={{ tabBarLabel: "В процессе" }} >
        {(props) => <PurchaseList seller {...props} purchases={pendingPurchases.reverse()} />}
      </Tab.Screen>
      <Tab.Screen name="SellerDonePurchase" options={{ tabBarLabel: "Завершенные" }} >
        {(props) => <PurchaseList seller {...props} purchases={donePurchases} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}