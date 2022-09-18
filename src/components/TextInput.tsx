import { Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type Props = {
  error: string | null | undefined
}

export const TextInputError = ({ error }: Props) => {
  return <Text style={{ fontSize: 11, color: Colors.Red }}> {error}</Text >
}