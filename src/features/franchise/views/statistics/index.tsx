import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FranchiseTabParamList } from 'features/franchise';
import React from 'react';
import { Text, View } from 'react-native';

type Props = BottomTabScreenProps<FranchiseTabParamList, 'Продажи'>;

const Statistics = () => {
  return (
    <View>
      <Text>Statistics</Text>
    </View>
  );
};

export default Statistics;
