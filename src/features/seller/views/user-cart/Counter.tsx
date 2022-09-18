import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';

type Props = {
  count: number;
  onIncrement: () => void
  onDecrement: () => void
}

export const Counter = ({ count, onDecrement, onIncrement }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onDecrement}>
        <View style={[styles.addButton]}>
          <Ionicons name="remove" size={26} color={'white'} />
        </View>
      </Pressable>
      <View style={[styles.addButton, { borderRightWidth: 1, borderLeftWidth: 1 }]}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Pressable onPress={onIncrement}>
        <View style={[styles.addButton]}>
          <Ionicons name="add" size={26} color={'white'} />
        </View>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addButton: {
    width: 40,
    borderColor: 'white',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: "white"
  },

})