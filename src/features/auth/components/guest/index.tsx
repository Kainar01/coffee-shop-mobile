import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import authApi from 'api/auth/api';
import { RootStackParamList } from 'App';
import { Button } from 'components/Button';
import { CustomInput } from 'components/CustomInput';
import { errorHandler } from 'features/error/utils';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';



type FormValuesProps = {
  username: string;
};

const User = () => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [signup, { isLoading }] = authApi.endpoints.signup.useMutation()

  const {
    control,
    handleSubmit,
  } = useForm<FormValuesProps>({
    mode: 'onBlur'
  });



  const handleGuestAuth = (value: FormValuesProps) => {
    return signup(value).unwrap()
      .then(() => navigate.navigate('User'))
      .catch(errorHandler)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите имя пользователя</Text>

      <CustomInput
        control={control}
        name="username"
        rules={{ required: 'Username is required' }}
        placeholder='Имя пользователя'
        secureTextEntry={false} />


      <View style={styles.buttonView}>
        <Button handlePress={handleSubmit(handleGuestAuth)} title='Войти' disabled={isLoading}></Button>
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