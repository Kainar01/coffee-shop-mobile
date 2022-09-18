import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import adminApi from 'api/admin/api';
import { Button } from 'components/Button';
import { Item as AdminItem } from 'features/admin/admin.interface';
import { NoData } from 'features/admin/components/NoData';
import { AdminItemStackParamList } from 'features/admin/navigators/Items';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ItemCreateModal } from './itemCreateModal';

const noImagePhoto = '../../../../../assets/no-image1.png'

const Item = ({ title, price, unitPrice, image }: AdminItem) => {

  return (
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
    </View>
  )
}



const AdminItemList = ({ route, navigation }: StackScreenProps<AdminItemStackParamList>) => {
  const itemGroupId = route.params?.itemGroupId as number
  const itemGroupTitle = route.params?.itemGroupTitle as string


  useEffect(() => {
    navigation.setOptions({ headerTitle: itemGroupTitle })
  }, [])


  const [open, setOpen] = useState(false);

  const { data: items } = adminApi.endpoints.getGroupItems.useQuery(itemGroupId)

  const renderItem = ({ item }: Record<'item', AdminItem>) => (
    <Item {...item} />
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
      <View>
        <Button handlePress={() => setOpen(true)} title='Создать' icon={<Ionicons name={'add'} size={26} color={Colors.white} />}></Button>
      </View>
      {open && <ItemCreateModal onDismiss={() => setOpen(false)} itemGroupId={itemGroupId} />}
    </View>

  );
};

export default AdminItemList;

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
