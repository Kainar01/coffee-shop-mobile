import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import authApi from 'api/auth/api';
import { LoginResponse } from 'api/auth/types';
import { RootStackParamList } from 'App';
import { Button } from 'components/Button';
import { CustomInput } from 'components/CustomInput';
import { errorHandler } from 'features/error/utils';
import { UserRole } from 'features/user/user.interface';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';



type FormValuesProps = {
  username: string;
  password: string;
};

const User = () => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [login, { isLoading }] = authApi.endpoints.login.useMutation()

  const {
    control,
    handleSubmit,
  } = useForm<FormValuesProps>({
    mode: 'onBlur'
  });



  const handleAuth = (value: FormValuesProps) => {
    return login(value).unwrap()
      .then(({ user }: LoginResponse) => {
        if (user.role === UserRole.ADMIN)
          navigate.navigate('Admin')
        else if (user.franchise)
          navigate.navigate('Franchise')
        else if (user.seller)
          navigate.navigate('Seller')
        else navigate.navigate('User')
      })
      .catch(errorHandler)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите ваши данные</Text>

      <CustomInput
        control={control}
        name="username"
        rules={{ required: 'Username is required' }}
        placeholder='Имя пользователя'
        secureTextEntry={false} />

      <CustomInput
        control={control}
        name="password"
        rules={{
          required: 'Password is required', minLength: {
            value: 3,
            message: 'Password should be minimum 3 characters long',
          },
        }}
        placeholder='Пароль'
        secureTextEntry={false} />

      <View style={styles.buttonView}>
        <Button handlePress={handleSubmit(handleAuth)} title='Войти' disabled={isLoading} ></Button>
      </View >
    </View >
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    margin: 20
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