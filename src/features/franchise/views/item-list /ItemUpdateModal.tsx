
import franchiseApi from 'api/franchise/api'
import { Button } from 'components/Button'
import { CustomInput } from 'components/CustomInput'
import { errorHandler } from 'features/error/utils'
import { FranchiseItem } from 'features/franchise/franchise.interface'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Modal from "react-native-modal"

type FormValuesProps = {
  unitPrice: string;
  price: string
  quantity: string
}

type Props = {
  onDismiss: () => void
  item: FranchiseItem
  franchiseId: number
}

export const ItemUpdateModal = ({ onDismiss, item, franchiseId }: Props) => {
  const [updateItem, { isLoading }] = franchiseApi.endpoints.updateFranchiseItem.useMutation()

  const {
    control,
    handleSubmit,
  } = useForm<FormValuesProps>({
    mode: 'onBlur',
    defaultValues: {
      unitPrice: item.unitPrice,
      quantity: `${item.quantity}`,
      price: item.price
    }
  });


  const handleItemGroupCreate = (value: FormValuesProps) => {
    updateItem({ ...value, id: item.id, franchiseId }).unwrap().then(onDismiss).catch(errorHandler)
  }

  return (
    <Modal onBackdropPress={onDismiss} isVisible={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Изменить цену и количество</Text>
        <CustomInput
          control={control}
          name="title"
          placeholder={item.title}
          secureTextEntry={false}
          disabled />
        <CustomInput
          control={control}
          name="image"
          placeholder={item.image || 'Нет фото'}
          secureTextEntry={false}
          disabled />
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
        <CustomInput
          control={control}
          name="quantity"
          rules={{ required: 'Количество товара обязательна' }}
          placeholder='Количество товара'
          secureTextEntry={false}
          numeric={true} />
        <Button extraStyles={styles.button} title="Обновить" handlePress={handleSubmit(handleItemGroupCreate)} disabled={isLoading}></Button>
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