import { DayPurchaseStats, PurchaseStats } from "features/franchise/franchise.interface"
import { StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-elements"
import { FlatList } from "react-native-gesture-handler"




type FranchiseSaleProps = {
  purchaseStats: PurchaseStats
}
export const FranchiseSaleStatistics = ({ purchaseStats }: FranchiseSaleProps) => {
  const Item = ({ total, day, month, year, profit }: DayPurchaseStats) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.item}>
        <Text style={styles.title}>{day}/{month}/{year}</Text>
        <Text style={styles.statText}>{profit} тг</Text>
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
      <Text style={styles.statText}>За сегодня</Text>
      <Text style={styles.title}>  Продажа: <Text style={styles.statText}>{lastDay?.total || 0} тг</Text></Text>
      <Text style={styles.title}>  Прибыль: <Text style={styles.statText}>{lastDay?.profit || 0} тг</Text></Text>
      <Text style={styles.statText}>За последний месяц</Text>
      <Text style={styles.title}>  Продажа: <Text style={styles.statText}>{lastMonth?.total || 0} тг</Text></Text>
      <Text style={styles.title}>  Прибыль: <Text style={styles.statText}>{lastMonth?.profit || 0} тг</Text></Text>
    </Card>
    <Text style={styles.statText}>По дням: (Прибыль - Продажа)</Text>
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