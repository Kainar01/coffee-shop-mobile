import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import sellerApi from "api/seller/api"
import QrCodeScanner from "components/QrCodeScanner"
import { setSellerWorkingTrack } from "features/auth/auth.slice"
import { errorHandler } from "features/error/utils"
import { SellerStartWorkStackParamList } from "features/seller/navigators/StartWork"
import { WorkingTrack } from "features/seller/seller.interface"
import { View } from "react-native"
import { useAppDispatch } from "store"

export const StartWorkQR = () => {
  const navigation = useNavigation<StackNavigationProp<SellerStartWorkStackParamList>>()
  const [startWorkDay, { isLoading }] = sellerApi.endpoints.startWorkingDay.useMutation()
  const dispatch = useAppDispatch()

  const handleSetWork = (workingTrack: WorkingTrack) => {

    dispatch(setSellerWorkingTrack(workingTrack))
  }

  const handleError = (err: any) => {
    errorHandler(err)
    navigation.goBack()
  }

  const handleData = (secret: string) => {
    if (!isLoading)
      startWorkDay(secret).unwrap().then(handleSetWork).catch(handleError)
  }

  return <View>
    <QrCodeScanner onScanned={handleData} />
  </View>
}