import { Purchase, PurchaseStatus } from "api/seller/types"
import { Button } from "components/Button"
import moment from 'moment'
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-elements"
type Props = {
  purchases: Array<Purchase>
}


export const PurchaseList = ({ purchases }: Props) => {
  const renderPurchase = ({ item }: Record<'item', Purchase>) => {
    const { total, discountAmount } = item

    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.container} >
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>Итого без скидки: <Text style={{ fontWeight: 'bold' }}>{total} тг</Text></Text>
            <Text style={styles.title} >Итого со скидкой: <Text style={{ fontWeight: 'bold' }}>{Number(total) - Number(discountAmount)} тг</Text></Text>
            <Text style={{ textAlign: 'right', marginVertical: 8, fontWeight: 'bold' }} >{moment(item.createdAt).format('D/MM/YYYY, HH:mm')}</Text>
            {item.status === PurchaseStatus.PENDING && <Button extraStyles={{ marginTop: 5 }} handlePress={() => console.log('doon')} title="Сделано" />}
          </View>
        </View>
      </Card>
    )
  }



  return (
    <View style={styles.container} >
      <FlatList
        data={purchases}
        renderItem={renderPurchase}
        keyExtractor={(purchase: Purchase) => `purchase-${purchase.id}`} />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  listContainer: {
    flex: 1
  },
  cardContainer: {
    borderRadius: 8,
    margin: 0,
    marginVertical: 8
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  title: {
    fontSize: 17,
  },
  textContainer: {
    flex: 1
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})