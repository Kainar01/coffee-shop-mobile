import { StackScreenProps } from '@react-navigation/stack';
import franchiseApi from 'api/franchise/api';
import { NoData } from 'features/admin/components/NoData';
import { FranchiseItem } from 'features/franchise/franchise.interface';
import { FranchiseItemStackParamList } from 'features/franchise/navigators/Items';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { ItemUpdateModal } from './ItemUpdateModal';

const noImagePhoto = '../../../../../assets/no-image1.png'

const Item = (item: FranchiseItem & { franchiseId: number }) => {
  const [open, setOpen] = useState(false);

  const { title, price, unitPrice, image, quantity } = item

  return (
    <Pressable onPress={() => setOpen(true)}>
      <View style={styles.item} >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={image ? {
              uri: image,
            } : require(noImagePhoto)}
          />
        </View>
        <View style={styles.itemTitle}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
        </View>
        <Text style={[styles.itemBadge]}>{unitPrice}тг</Text>
        <Text style={[styles.itemBadge, { marginLeft: 20 }]}>{price}тг</Text>
        <Text style={{ position: 'absolute', bottom: 5, right: 10 }}>х {quantity} штук</Text>
        {open && <ItemUpdateModal franchiseId={item.franchiseId} item={item} onDismiss={() => setOpen(false)} />}
      </View>
    </Pressable>

  )
}



const FranchiseItemList = ({ route, navigation }: StackScreenProps<FranchiseItemStackParamList>) => {
  const itemGroupId = route.params?.itemGroupId as number
  const franchiseId = route.params?.franchiseId as number
  const itemGroupTitle = route.params?.itemGroupTitle as string

  useEffect(() => {
    navigation.setOptions({ headerTitle: itemGroupTitle })
  }, [])




  const { data: items } = franchiseApi.endpoints.getFranchiseGroupItems.useQuery({ itemGroupId, franchiseId })

  const renderItem = ({ item }: Record<'item', FranchiseItem>) => (
    <Item {...item} franchiseId={franchiseId} />
  );

  return (

    <View style={styles.container}>
      {items && items.length === 0 && <NoData title="У вас нет товаров этой группе" />}
      <View style={styles.listContainer}>
        {items &&
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => `item-group-${item.id}`}
          />}
      </View>
    </View>

  );
};

export default FranchiseItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemTitle: {
    flex: 1,
  },
  itemBadge: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
  },
  buttonContainer: {
    alignSelf: 'flex-end'
  },
  listContainer: {
    flex: 1
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8
  },
  imageContainer: {
    width: 50,
    height: 50,
    marginRight: 10
  }
});
