import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import QrCodeScanner from 'components/QrCodeScanner';
import { SellerCartStackParamList } from 'features/seller/navigators/Cart';
import React from 'react';
import { View } from 'react-native';


const UserQR = () => {
  const navigation = useNavigation<StackNavigationProp<SellerCartStackParamList>>()

  const handleData = (username: string) => {
    console.log(username, 'username')
    //todo: get user
    navigation.navigate('UserCart', { username })
    console.log('username=', username)
  }

  return (
    <View>
      <QrCodeScanner onScanned={handleData} />
    </View>
  );
};

export default UserQR;
