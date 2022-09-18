import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FranchiseTabParamList } from 'features/franchise';
import React from 'react';
import { Text, View } from 'react-native';

type Props = BottomTabScreenProps<FranchiseTabParamList, 'Профиль'>;

const FranchiseProfile = () => {
  return (
    <View>
      <Text>FranchiseProfile</Text>
    </View>
  );
};

export default FranchiseProfile;
