import franchiseApi from 'api/franchise/api';
import { Button } from 'components/Button';
import { QR_CODE_PREFIX } from 'constants/qr';
import { logout } from 'features/auth/auth.slice';
import moment from 'moment';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useAppDispatch } from 'store';


export const QRGenerator = () => {
  const [generateQrSecret, { data: verification }] = franchiseApi.endpoints.generateQRVerificationSecret.useMutation()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  useEffect(() => {
    generateQrSecret(null)
  }, [])

  return (
    <View style={styles.container}>
      {verification &&
        <QRCode
          size={200}
          value={`${QR_CODE_PREFIX}${verification.secret}`}
        />}
      <Text style={styles.title}>Сканируйте этот QR код для чтобы начать рабочий день. QR действителен до {moment(verification?.dueDate).format('D/MM/YYYY, HH:mm')}</Text>
      <Button extraStyles={{ width: '100%', marginBottom: 10 }} handlePress={() => generateQrSecret(null)} title="Сгенерировать новый" />
      <Button extraStyles={{ width: '100%' }} handlePress={handleLogout} title="Выйти" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 20
  },
  title: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center'
  }
})