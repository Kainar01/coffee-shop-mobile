import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Admin from "features/admin";
import Auth from "features/auth";
import Franchise from "features/franchise";
import Seller from "features/seller";
import UserScreen from "features/user";
import { UserRole } from "features/user/user.interface";
import { useAuth } from "hooks/useAuth";

export type RootStackParamList = {
  Login: undefined;
  User: undefined;
  Seller: undefined;
  Franchise: undefined;
  Admin: undefined
}

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  const { user, isLoggedIn } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn && <Stack.Screen
          name="Login"
          component={Auth}
          options={{ title: "Login" }}
        />}
        {user?.role === UserRole.ADMIN &&
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{ title: "Admin" }}
          />}
        {user?.seller && <Stack.Screen
          name="Seller"
          component={Seller}
          options={{ title: "Seller" }}
        />}
        {user?.franchise &&
          <Stack.Screen
            name="Franchise"
            component={Franchise}
            options={{ title: "Franchise" }}
          />}
        {user && <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ title: "User" }}
        />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

