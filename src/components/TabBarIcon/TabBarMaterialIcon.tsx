import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';


type Props = {
  focused: boolean;
  focusedIcon: keyof typeof MaterialIcons.glyphMap;
  defaultIcon: keyof typeof MaterialIcons.glyphMap
};

export const TabBarMaterialIcon = ({ focused, focusedIcon, defaultIcon }: Props) => {
  const iconName = focused ? focusedIcon : defaultIcon;
  return <MaterialIcons name={iconName} size={26} color={Colors.black} />;
};
