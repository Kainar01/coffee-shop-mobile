import { COLOR_GRAY, COLOR_TEXT } from 'constants/colors';
import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';


const Button: React.FC<IProps> = ({
  title,
  handlePress,
  color = COLOR_TEXT,
  extraStyles,
  icon,
  disabled = false,
}) => {
  const mixed = { ...styles.button, ...extraStyles };
  if (disabled) mixed.backgroundColor = COLOR_GRAY;
  return (
    <Pressable style={mixed} onPress={handlePress} disabled={disabled}>
      <Text style={{ ...styles.title, color }}>{title}</Text>{icon}
    </Pressable>
  );
};

interface IProps {
  title: string;
  color?: string;
  extraStyles?: any;
  disabled?: boolean;
  icon?: React.ReactNode
  handlePress: () => void;
}

export { Button };

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingHorizontal: 35,
    padding: 15,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
});