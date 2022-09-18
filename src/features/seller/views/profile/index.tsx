import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SellerTabParamList } from 'features/seller';
import React from 'react';
import { Text, View } from 'react-native';

type Props = BottomTabScreenProps<SellerTabParamList, 'Профиль'>;

const SellerProfile = () => {
  return (
    <View>
      <Text>SellerProfile</Text>
    </View>
  );
};

export default SellerProfile;
