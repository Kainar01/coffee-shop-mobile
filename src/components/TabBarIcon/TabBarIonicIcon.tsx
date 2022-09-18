import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';


type Props = {
  focused: boolean;
  focusedIcon: keyof typeof Ionicons.glyphMap;
  defaultIcon: keyof typeof Ionicons.glyphMap
};

export const TabBarIonicIcon = ({ focused, focusedIcon, defaultIcon }: Props) => {
  const iconName = focused ? focusedIcon : defaultIcon;
  return <Ionicons name={iconName} size={26} color={Colors.black} />;
};

