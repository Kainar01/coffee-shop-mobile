import { AuthUser } from 'features/auth/auth.interface'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

type Props = {
  user: AuthUser
}

const UserInfo = ({ user }: Props) => {
  return (
    <>
      <Text style={styles.title}>Имя пользователя: {user?.username}</Text>
      {user?.role && <Text style={styles.title}>Роль: {user.role}</Text>}
    </>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})