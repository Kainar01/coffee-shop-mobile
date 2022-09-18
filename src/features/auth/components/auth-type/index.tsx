import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'components/Button';
import { AuthStackParamList } from 'features/auth';
import { StyleSheet, Text, View } from 'react-native';


const AuthType = () => {
  const navigate = useNavigation<BottomTabNavigationProp<AuthStackParamList>>()
  const handleUserAuth = () => {
    navigate.navigate('AuthUser')
  }

  const handleGuestAuth = () => {
    navigate.navigate('AuthGuest')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите авторизацию</Text>
      <View style={styles.buttonView}>
        <Button handlePress={handleUserAuth} title='У меня есть аккаунт' ></Button>
      </View>
      <View style={styles.buttonView}>
        <Button handlePress={handleGuestAuth} title='Войти как гость' ></Button>
      </View >
    </View >
  );
};

export default AuthType;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%'
  },
  buttonView: {
    marginVertical: 8,
    alignSelf: 'center',
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
})