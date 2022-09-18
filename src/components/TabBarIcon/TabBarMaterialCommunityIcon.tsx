import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';


type Props = {
  focused: boolean;
  focusedIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  defaultIcon: keyof typeof MaterialCommunityIcons.glyphMap
};

export const TabBarMaterialCommunityIcon = ({ focused, focusedIcon, defaultIcon }: Props) => {
  const iconName = focused ? focusedIcon : defaultIcon;
  return <MaterialCommunityIcons name={iconName} size={26} color={Colors.black} />;
};

