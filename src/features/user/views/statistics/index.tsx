import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import sellerApi from 'api/seller/api';
import { PurchaseStatus } from 'api/seller/types';
import { PurchaseList } from 'features/seller/views/statistics/PurchaseList';
import { useAuth } from 'hooks/useAuth';
import _ from 'lodash';
import { Text } from 'react-native-elements';

export interface StatisticsParamList {
  SellerPendingPurchase: undefined
  SellerDonePurchase: undefined
}

const Tab = createMaterialTopTabNavigator();

export const Statistics = () => {
  const { user } = useAuth();

  if (!user?.seller?.id) return <Text>Loading</Text>

  const { data: purchases } = sellerApi.endpoints.getUserPurchases.useQuery(user?.id, { skip: !user?.id })

  const data = _.groupBy(purchases, 'status')

  const donePurchases = data[PurchaseStatus.PAID] || []
  const pendingPurchases = data[PurchaseStatus.PENDING] || []

  return (
    <Tab.Navigator screenOptions={{ tabBarIndicatorStyle: { backgroundColor: 'black' } }}>
      <Tab.Screen name="SellerPendingPurchase" options={{ tabBarLabel: "В процессе" }} >
        {(props) => <PurchaseList {...props} purchases={pendingPurchases.reverse()} />}
      </Tab.Screen>
      <Tab.Screen name="SellerDonePurchase" options={{ tabBarLabel: "Завершенные" }} >
        {(props) => <PurchaseList {...props} purchases={donePurchases} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}