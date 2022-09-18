
import adminApi from 'api/admin/api'
import { Button } from 'components/Button'
import { CustomInput } from 'components/CustomInput'
import { errorHandler } from 'features/error/utils'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Modal from "react-native-modal"

type FormValuesProps = {
  title: string
  unitPrice: number;
  price: number
  image: string
}

type Props = {
  onDismiss: () => void
  itemGroupId: number
}
export const ItemCreateModal = ({ onDismiss, itemGroupId }: Props) => {
  const [createItem, { isLoading }] = adminApi.endpoints.createItem.useMutation()

  const {
    control,
    handleSubmit,
  } = useForm<FormValuesProps>({
    mode: 'onBlur'
  });

  const handleItemGroupCreate = (value: FormValuesProps) => {
    createItem({ ...value, itemGroupId }).unwrap().then(onDismiss).catch(errorHandler)
  }

  return (
    <Modal onBackdropPress={onDismiss} isVisible={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Добавить товар</Text>
        <CustomInput
          control={control}
          name="title"
          rules={{ required: 'Название товара обязательно' }}
          placeholder='Название товара'
          secureTextEntry={false} />
        <CustomInput
          control={control}
          name="image"
          rules={{}}
          placeholder='Ссылка на товар если есть (Не обязательно)'
          secureTextEntry={false} />
        <CustomInput
          control={control}
          name="unitPrice"
          rules={{ required: 'Себестоимость обязательна' }}
          placeholder='Себестоимость'
          secureTextEntry={false}
          numeric={true} />
        <CustomInput
          control={control}
          name="price"
          rules={{ required: 'Цена продажи товара обязательна' }}
          placeholder='Цена продажи'
          secureTextEntry={false}
          numeric={true} />
        <Button extraStyles={styles.button} title="Создать" handlePress={handleSubmit(handleItemGroupCreate)} disabled={isLoading}>Hello</Button>
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
  }
})