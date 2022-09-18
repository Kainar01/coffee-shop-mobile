import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import adminApi from 'api/admin/api';
import { Button } from 'components/Button';
import { CustomInput } from 'components/CustomInput';
import { AdminFranchiseStackParamList } from 'features/admin/navigators/Franchise';
import { errorHandler } from 'features/error/utils';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';



type FormValuesProps = {
  email: string
  username: string;
  name: string
};

const AdminFranchiseCreate = () => {
  const navigate = useNavigation<StackNavigationProp<AdminFranchiseStackParamList>>()
  const [createFranchise, { isLoading }] = adminApi.endpoints.createFranchise.useMutation()

  const {
    control,
    handleSubmit,
  } = useForm<FormValuesProps>({
    mode: 'onBlur'
  });



  const handleGuestAuth = (value: FormValuesProps) => {
    return createFranchise(value).unwrap()
      .then(() => navigate.navigate('AdminFranchiseList'))
      .catch(errorHandler)
  }

  return (
    <Card containerStyle={styles.container}>
      <Text style={styles.title}>Введите данные франшизы</Text>

      <CustomInput
        control={control}
        name="name"
        rules={{ required: 'Название франшизы обязательно' }}
        placeholder='Название франшизы'
        secureTextEntry={false} />


      <CustomInput
        control={control}
        name="username"
        rules={{ required: 'Имя пользователя обязательна' }}
        placeholder='Имя пользователя'
        secureTextEntry={false} />

      <CustomInput
        control={control}
        name="email"
        rules={{ required: 'Почта обязательна' }}
        placeholder='Почта пользователя'
        secureTextEntry={false} />

      <View style={styles.buttonView}>
        <Button handlePress={handleSubmit(handleGuestAuth)} title='Создать' disabled={isLoading}></Button>
      </View >
    </Card>
  );
};

export default AdminFranchiseCreate;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    margin: 8
  },
  buttonView: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
})