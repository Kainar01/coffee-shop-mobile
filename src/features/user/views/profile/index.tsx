import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'components/Button';
import { AuthSeller } from 'features/auth/auth.interface';
import { logout, makeQrGenerator } from 'features/auth/auth.slice';
import { WorkingTrack } from 'features/seller/seller.interface';
import { SellerProfileStackParamList } from 'features/seller/views/profile';
import UserInfo from 'features/user/components/UserInfo';
import { useAuth } from 'hooks/useAuth';
import moment from 'moment';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useAppDispatch } from 'store';


const UserProfile = () => {
  const { user } = useAuth()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleMakeQRGenerator = () => {
    dispatch(makeQrGenerator())
  }

  return (
    <Card containerStyle={styles.container}>
      {user && <UserInfo user={user} />}
      {user?.franchise && <>
        <Text style={styles.title}>Ваша фрашиза: {user.franchise.name}</Text>
        <Button handlePress={handleMakeQRGenerator} extraStyles={{ marginVertical: 10 }} title="Сделать QR генератором" />
      </>}
      {user?.seller && <SellerInfo seller={user.seller} />}
      <Pressable style={{ position: 'absolute', top: 0, right: 0 }} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={30} />
      </Pressable>
    </Card>
  );
};

export default UserProfile;

type SellerInfoProps = {
  seller: AuthSeller
}

const SellerInfo = ({ seller }: SellerInfoProps) => {
  const { workingTrack } = seller
  return <>
    <Text style={styles.title}>Ваше имя: {seller.name}</Text>
    <Text style={styles.title}>Роль: Кассир</Text>
    {workingTrack && <SellerWorkingTrack workingTrack={workingTrack} />}
  </>
}


type SellerWorkingTrackProps = {
  workingTrack: WorkingTrack
}

const SellerWorkingTrack = ({ workingTrack }: SellerWorkingTrackProps) => {
  const navigation = useNavigation<StackNavigationProp<SellerProfileStackParamList>>()

  const getMessage = () => {
    const startDate = moment(workingTrack.startDate).format('HH:mm')

    const total = moment.duration(moment().diff(moment(workingTrack.startDate)))

    let message = `Вы начали работу в ${startDate}. \nПрошло ${Math.floor(total.asHours())}:${Math.floor(total.asMinutes() % 60)}:${Math.floor(total.asSeconds() % 60)}\n\n`
    message += 'Вы действительно хотите завершить рабочий день?'
    return message
  }

  const startDate = moment(workingTrack.startDate).format('HH:mm')

  const onWorkFinish = () => {
    navigation.navigate('SellerEndWork')
  }

  const showAlert = () =>
    Alert.alert(
      "Завершение рабочего дня",
      getMessage(),
      [
        {
          text: "Да",
          onPress: onWorkFinish,
          style: "destructive",
        },
        {
          text: "Отменить",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );


  return <>
    <Text style={styles.title}>Начало рабочего дня: {startDate}</Text>
    <Button handlePress={() => showAlert()} extraStyles={{ marginVertical: 10 }} title="Завершить работу" />
  </>
}
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    borderRadius: 8,
    margin: 8
  },
  buttonView: {
    marginTop: 20,
    alignSelf: 'flex-start',
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})