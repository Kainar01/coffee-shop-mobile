import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import sellerApi from "api/seller/api"
import QrCodeScanner from "components/QrCodeScanner"
import { setSellerWorkingTrack } from "features/auth/auth.slice"
import { errorHandler } from "features/error/utils"
import { SellerStartWorkStackParamList } from "features/seller/navigators/StartWork"
import { Alert, View } from "react-native"
import { useAppDispatch } from "store"

export const EndWorkQR = () => {
  const navigation = useNavigation<StackNavigationProp<SellerStartWorkStackParamList>>()
  const [endWorkDay, { isLoading }] = sellerApi.endpoints.endWorkingDay.useMutation()
  const dispatch = useAppDispatch()

  const handleError = (err: any) => {
    errorHandler(err)
    navigation.goBack()
  }

  const handleEndWork = (secret: string) => {
    if (!isLoading) {
      endWorkDay(secret).unwrap().then((workingTrack) => dispatch(setSellerWorkingTrack(workingTrack))).catch(handleError)
      Alert.alert('Вы закончили день. Хорошего отдыха!')
    }
  }

  return <View>
    <QrCodeScanner onScanned={handleEndWork} />
  </View>
}