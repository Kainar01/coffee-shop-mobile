import { StyleSheet, View } from "react-native"
import { Text } from "react-native-elements"

type Props = {
  title: string
}

export const NoData = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  }
})