import { Button } from 'components/Button';
import { logout } from 'features/auth/auth.slice';
import { Seller } from 'features/seller/seller.interface';
import UserInfo from 'features/user/components/UserInfo';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useAppDispatch } from 'store';


const UserProfile = () => {
  const { user } = useAuth()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Card containerStyle={styles.container}>
      {user && <UserInfo user={user} />}
      {user?.seller && <SellerInfo seller={user.seller} />}
      <View style={styles.buttonView}>
        <Button handlePress={handleLogout} title='Выйти' ></Button>
      </View >
    </Card>
  );
};

export default UserProfile;

type SellerInfoProps = {
  seller: Seller
}
const SellerInfo = ({ seller }: SellerInfoProps) => {
  return <>
    <Text style={styles.title}>Ваше имя: {seller.name}</Text>
    <Text style={styles.title}>Роль: Кассир</Text>
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