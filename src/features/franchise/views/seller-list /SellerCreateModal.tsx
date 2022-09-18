
import franchiseApi from 'api/franchise/api'
import { Button } from 'components/Button'
import { CustomInput } from 'components/CustomInput'
import { errorHandler } from 'features/error/utils'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Modal from "react-native-modal"

type FormValuesProps = {
  email: string
  username: string;
  name: string
  image: string
}

type Props = {
  onDismiss: () => void
}
export const SellerCreateModal = ({ onDismiss }: Props) => {
  const [createSeller, { isLoading }] = franchiseApi.endpoints.createSeller.useMutation()

  const {
    control,
    handleSubmit,
  } = useForm<FormValuesProps>({
    mode: 'onBlur'
  });

  const handleItemGroupCreate = (value: FormValuesProps) => {
    createSeller(value).unwrap().then(onDismiss).catch(errorHandler)
  }

  return (
    <Modal onBackdropPress={onDismiss} isVisible={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Добавить кассира</Text>
        <CustomInput
          control={control}
          name="email"
          rules={{ required: 'Почта обязательна' }}
          placeholder='Почта'
        />
        <CustomInput
          control={control}
          name="username"
          rules={{ required: 'Имя пользователя обязательно' }}
          placeholder='Имя пользователя'
        />
        <CustomInput
          control={control}
          name="name"
          rules={{ required: 'Имя пользователя обязательно' }}
          placeholder='Имя сотрудника'
        />
        <CustomInput
          control={control}
          name="image"
          placeholder='Ссылка на фото (Не обязательно)'
        />
        <Button extraStyles={styles.button} disabled={isLoading} title="Создать" handlePress={handleSubmit(handleItemGroupCreate)}>Hello</Button>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  modal: {
    borderRadius: 8
  }
})