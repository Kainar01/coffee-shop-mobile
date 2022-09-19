import { FranchiseItem } from "features/franchise/franchise.interface"
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Image, Text } from "react-native-elements"
import { CartItem } from "."
import { Counter } from "./Counter"

type Props = {
  items: Array<FranchiseItem>
  onQuantityIncrement: (item: FranchiseItem) => void
  onQuantityDecrement: (item: FranchiseItem) => void
  selected: Record<number, CartItem>
}

const noImagePhoto = '../../../../../assets/no-image1.png'


export const ItemList = ({ items, selected, onQuantityIncrement, onQuantityDecrement }: Props) => {
  const renderItemGroup = ({ item }: Record<'item', FranchiseItem>) => {
    const { image, title, price, id, quantity } = item

    const isLowStock = Number(quantity) <= 5


    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.container} >
          <Image
            style={styles.image}
            source={image ? {
              uri: image,
            } : require(noImagePhoto)}
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text style={styles.title}>{price} тг</Text>
          </View>
          <View style={styles.counterContainer}>
            {Number(quantity) > 0 ?
              <>
                <Counter max={Number(quantity)} count={selected[id]?.quantity || 0} onDecrement={() => onQuantityDecrement(item)}
                  onIncrement={() => onQuantityIncrement(item)} />
                <Text style={{ textAlign: 'right', color: isLowStock ? 'red' : 'black', marginTop: 5 }}>Осталось {quantity} штук</Text>
              </>
              : <Text>Нет в наличии</Text>}
          </View>
        </View>
      </Card>
    )
  }



  return (
    <View style={styles.container} >
      <FlatList
        data={items}
        renderItem={renderItemGroup}
        keyExtractor={(item: FranchiseItem) => `item-${item.id}`} />
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
    marginVertical: 8,
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textContainer: {
    flex: 1,
    marginRight: 10
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})