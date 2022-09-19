import { createStackNavigator } from '@react-navigation/stack';
import FranchiseItemGroupList from '../views/item-group-list';
import FranchiseItemList from '../views/item-list ';

export type FranchiseItemStackParamList = {
  FranchiseItemGroupList: undefined;
  FranchiseItemList: {
    itemGroupId: number;
    itemGroupTitle: string;
    franchiseId: number;
  };
};

const Stack = createStackNavigator<FranchiseItemStackParamList>();

const FranchiseItems = () => {
  return (
    <Stack.Navigator initialRouteName='FranchiseItemGroupList' screenOptions={{ headerTitle: 'Товары' }}>
      <Stack.Screen name="FranchiseItemGroupList" component={FranchiseItemGroupList} />
      <Stack.Screen name="FranchiseItemList" component={FranchiseItemList} />
    </Stack.Navigator>
  );
};

export default FranchiseItems;