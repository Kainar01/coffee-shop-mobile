import { QR_CODE_PREFIX } from 'constants/qr';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';


const SellerOrder = () => {
  const { user } = useAuth();

  const discount = user?.phone ? '15%' : '5%'
  return (
    <View style={styles.container}>
      {user &&
        <QRCode
          size={200}
          value={`${QR_CODE_PREFIX}${user.username}`}
        />}
      <Text style={styles.title}>Покажите QR код кассиру и получите скидку в размере {discount}</Text>
    </View>
  );
};

export default SellerOrder;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 20
  },
  title: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  }
})