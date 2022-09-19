import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import sellerApi from 'api/seller/api';
import { PurchaseStatus } from 'api/seller/types';
import { PurchaseList } from 'features/seller/views/statistics/PurchaseList';
import { SellerTabParamList } from 'features/user';
import { useAuth } from 'hooks/useAuth';
import _ from 'lodash';

export interface StatisticsParamList {
  SellerPendingPurchase: undefined
  SellerDonePurchase: undefined
}

const Tab = createMaterialTopTabNavigator();

export const Statistics = ({ navigation }: StackScreenProps<SellerTabParamList>) => {
  const { user } = useAuth();

  const userId = user?.id as number

  const { data: purchases, refetch } = sellerApi.endpoints.getUserPurchases.useQuery(userId, { skip: !userId })

  navigation.addListener('focus', () => refetch())

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