import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SellerTabParamList } from 'features/seller';
import React from 'react';
import { Text, View } from 'react-native';

type Props = BottomTabScreenProps<SellerTabParamList, 'Продажи'>;

const SellerStatistics = () => {
  return (
    <View>
      <Text>SellerStatistics</Text>
    </View>
  );
};

export default SellerStatistics;
