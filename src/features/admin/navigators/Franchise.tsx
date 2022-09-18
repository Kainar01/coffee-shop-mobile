import { createStackNavigator } from '@react-navigation/stack';
import AdminFranchiseCreate from '../views/franchise-create';
import AdminFranchiseList from '../views/franchise-list';

export type AdminFranchiseStackParamList = {
  AdminFranchiseCreate: undefined;
  AdminFranchiseList: undefined;
};

const Stack = createStackNavigator<AdminFranchiseStackParamList>();

const AdminFranchise = () => {
  return (
    <Stack.Navigator initialRouteName='AdminFranchiseList' screenOptions={{ headerTitle: 'Франшизы' }}>
      <Stack.Screen name="AdminFranchiseList" component={AdminFranchiseList} />
      <Stack.Screen name="AdminFranchiseCreate" component={AdminFranchiseCreate}
        options={{ headerTitle: 'Добавить франшизу' }} />
    </Stack.Navigator>
  );
};

export default AdminFranchise;