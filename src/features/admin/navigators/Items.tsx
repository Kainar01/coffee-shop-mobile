import { createStackNavigator } from '@react-navigation/stack';
import AdminItemGroupList from '../views/item-group-list';
import AdminItemList from '../views/item-list ';

export type AdminItemStackParamList = {
  AdminItemGroupList: undefined;
  AdminItemList: {
    itemGroupId: number;
    itemGroupTitle: string
  };

};

const Stack = createStackNavigator<AdminItemStackParamList>();

const AdminItems = () => {
  return (
    <Stack.Navigator initialRouteName='AdminItemGroupList' screenOptions={{ headerTitle: 'Товары' }}>
      <Stack.Screen name="AdminItemGroupList" component={AdminItemGroupList} />
      <Stack.Screen name="AdminItemList" component={AdminItemList} />
    </Stack.Navigator>
  );
};

export default AdminItems;