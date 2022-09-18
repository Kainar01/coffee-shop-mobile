import { Item } from "features/admin/admin.interface"
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Image, Text } from "react-native-elements"
import { CartItem } from "."
import { Counter } from "./Counter"

type Props = {
  items: Array<Item>
  onQuantityIncrement: (item: Item) => void
  onQuantityDecrement: (item: Item) => void
  selected: Record<number, CartItem>
}

const noImagePhoto = '../../../../../assets/no-image1.png'


export const ItemList = ({ items, selected, onQuantityIncrement, onQuantityDecrement }: Props) => {
  const renderItemGroup = ({ item }: Record<'item', Item>) => {
    const { image, title, price, id } = item


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
            <Text numberOfLines={2} style={styles.title}>{title}</Text>
            <Text style={styles.title}>{price} тг</Text>
          </View>
          <View style={styles.counterContainer}>
            <Counter count={selected[id]?.quantity || 0} onDecrement={() => onQuantityDecrement(item)}
              onIncrement={() => onQuantityIncrement(item)} />
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
        keyExtractor={(itemGroup: Item) => `item-${itemGroup.id}`} />
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  textContainer: {
    flex: 1
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})