import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  control: Control<any, any>,
  name: string;
  rules?: any;
  placeholder: string;
  secureTextEntry?: boolean
  numeric?: boolean
  disabled?: boolean
}

export const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  numeric = false,
  disabled
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8' },
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={numeric ? 'numeric' : 'default'}
              editable={!disabled}
            />
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 9,

    paddingHorizontal: 5,
    marginVertical: 5,
  },
  input: {
    padding: 10,
  },
});

