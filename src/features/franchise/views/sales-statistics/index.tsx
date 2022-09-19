import franchiseApi from "api/franchise/api"
import { DayPurchaseStats } from "features/franchise/franchise.interface"
import { StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-elements"
import { FlatList } from "react-native-gesture-handler"





export const FranchiseSaleStatistics = () => {
  const { data: purchaseStats } = franchiseApi.endpoints.getPurchaseStats.useQuery(null)

  const Item = ({ total, day, month, year }: DayPurchaseStats) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.item}>
        <Text style={styles.title}>{day}/{month}/{year}</Text>
        <Text style={styles.statText}>{total} тг</Text>
      </View>
    </Card>
  );
  const renderItem = ({ item }: Record<'item', DayPurchaseStats>) => (
    <Item {...item} />
  );
  const dayStats = [...purchaseStats?.days || []].reverse()

  const lastDay = dayStats[0]
  const lastMonth = purchaseStats?.months?.[0]

  return <View style={{ padding: 8 }}>
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.statText}>Общая статистика</Text>
      <Text style={styles.title}>Сегодня: <Text style={styles.statText}>{lastDay?.total || 0} тг</Text></Text>
      <Text style={styles.title}>За этот месяц: <Text style={styles.statText}>{lastMonth?.total || 0} тг</Text></Text>
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