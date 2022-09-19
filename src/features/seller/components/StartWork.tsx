import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "components/Button";
import { AuthSeller } from "features/auth/auth.interface";
import { logout } from "features/auth/auth.slice";
import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { useAppDispatch } from "store";
import { SellerStartWorkStackParamList } from "../navigators/StartWork";


type Props = {
  seller: AuthSeller
}
export const StartWork = ({ seller }: Props) => {

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  const navigation = useNavigation<StackNavigationProp<SellerStartWorkStackParamList>>()
  const currentDate = moment().format('HH:mm')
  return <View style={styles.container}>
    <Card containerStyle={{ margin: 10, borderRadius: 8 }}>
      <Text style={styles.title}>Привет,<Text style={{ fontWeight: 'bold' }}> {seller.name}</Text></Text>
      <Text style={styles.title}>Время <Text style={{ fontWeight: 'bold' }}>{currentDate}</Text>. Чтобы начать рабочий день нажми кнопку ниже и сканируйте QR </Text>
      <Button extraStyles={{ width: '100%', marginBottom: 10 }} handlePress={() => navigation.navigate('StartWork')} title="Начать работу" />
      <Button extraStyles={{ width: '100%' }} handlePress={handleLogout} title="Выйти" />
    </Card>
  </View >
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  }
})