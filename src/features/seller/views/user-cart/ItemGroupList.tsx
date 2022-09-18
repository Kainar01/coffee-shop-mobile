import { ItemGroupWithCount } from "api/seller/types"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-elements"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"

type Props = {
  itemGroups: Array<ItemGroupWithCount>
  onPickItemGroup: (id: number) => void
  selected: number | null
}

export const ItemGroupList = ({ itemGroups, selected, onPickItemGroup }: Props) => {
  const ItemGroupTag = ({ item }: Record<'item', ItemGroupWithCount>) => {
    return (
      <View style={[styles.topicContainer, item.id === selected && { backgroundColor: 'white' }]} >
        <TouchableOpacity onPress={() => onPickItemGroup(item.id)}>
          <Text style={[styles.topicText, item.id === selected && { color: 'black' }]} >
            {item.title} {item.items}
          </Text >
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container} >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {itemGroups.map(itemGroup => <ItemGroupTag key={itemGroup.id} item={itemGroup} />)}
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  topicContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#000000'
  },
  topicText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    color: 'white'
  },
  title: {
    fontSize: 13,
    color: 'rgb(134,130,119)',
    marginBottom: 5,
    marginLeft: 15,
    fontWeight: '600'
  }
})