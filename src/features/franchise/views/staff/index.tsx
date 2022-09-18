import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FranchiseTabParamList } from 'features/franchise';
import React from 'react';
import { Text, View } from 'react-native';

type Props = BottomTabScreenProps<FranchiseTabParamList, 'Персонал'>;

const Staff = () => {
  return (
    <View>
      <Text>Staff</Text>
    </View>
  );
};

export default Staff;
