import { Text } from 'react-native'

type Props = {
  focused: boolean
  label: string
}

export const TabBarLabel = ({ focused, label }: Props) => {
  return <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize: 11 }}> {label}</Text >
}