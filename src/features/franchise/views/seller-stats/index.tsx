import { StackScreenProps } from "@react-navigation/stack"
import sellerApi from "api/seller/api"
import { FranchiseSellerStackParamList } from "features/franchise/navigators/Seller"
import { WorkingTrackDayStats } from "features/seller/seller.interface"
import { StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-elements"
import { FlatList } from "react-native-gesture-handler"


export const SellerWorkStats = ({ route, navigation }: StackScreenProps<FranchiseSellerStackParamList>) => {
  const sellerId = route.params?.sellerId as number

  const { data: workStats, refetch } = sellerApi.endpoints.sellerWorkStats.useQuery(sellerId)

  navigation.addListener('focus', () => refetch())
  const Item = ({ total, day, month, year }: WorkingTrackDayStats) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.item}>
        <Text style={styles.title}>{day}/{month}/{year}</Text>
        <Text style={styles.statText}>{total}</Text>
      </View>
    </Card>
  );

  const renderItem = ({ item }: Record<'item', WorkingTrackDayStats>) => (
    <Item {...item} />
  );

  const dayStats = [...workStats?.days || []].reverse()

  const lastMonth = workStats?.months?.[0]

  return <View style={{ padding: 8 }}>
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.statText}>За последний месяц</Text>
      <Text style={styles.title}>  Часов работы: <Text style={styles.statText}>{lastMonth?.total || 0}</Text></Text>
    </Card>
    <Text style={styles.statText}>По дням: </Text>
    {dayStats &&
      <FlatList
        data={dayStats}
        renderItem={renderItem}
        keyExtractor={dayStats => `${dayStats.year}/${dayStats.month}/${dayStats.day}`}
      />}
  </View>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardContainer: {
    margin: 0,
    marginBottom: 8
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})