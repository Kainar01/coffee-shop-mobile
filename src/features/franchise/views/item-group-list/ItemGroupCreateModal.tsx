
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

}

type Props = {
  onDismiss: () => void
}
export const ItemGroupCreateModal = ({ onDismiss }: Props) => {
  const [createItemGroup, { isLoading }] = adminApi.endpoints.createItemGroup.useMutation()

  const {
    control,
    handleSubmit,
  } = useForm<FormValuesProps>({
    mode: 'onBlur'
  });

  const handleItemGroupCreate = (value: FormValuesProps) => {
    createItemGroup(value).unwrap().then(onDismiss).catch(errorHandler)
  }

  return (
    <Modal onBackdropPress={onDismiss} isVisible={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Добавить группу товаров</Text>
        <CustomInput
          control={control}
          name="title"
          rules={{ required: 'Название группы товаров обязательно' }}
          placeholder='Название группы товаров'
          secureTextEntry={false} />
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