import { Ionicons } from '@expo/vector-icons';
import franchiseApi from 'api/franchise/api';
import { Button } from 'components/Button';
import { Seller } from 'features/seller/seller.interface';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SellerCreateModal } from './SellerCreateModal';

const noImagePhoto = '../../../../../assets/no-image1.png'

const Item = ({ name, image }: Seller) => {

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
        <Text numberOfLines={1} style={styles.title}>{name}</Text>
      </View>
    </View>
  )
}



const SellerList = () => {
  const [open, setOpen] = useState(false);

  const { data: sellers, error } = franchiseApi.endpoints.getSellers.useQuery(null)

  const renderItem = ({ item }: Record<'item', Seller>) => (
    <Item {...item} />
  );
  console.log(error)
  return (

    <View style={styles.container}>
      {sellers && sellers.length === 0 && <Text style={[styles.title, { textAlign: 'center' }]}>У вас нет кассиров</Text>}
      <View style={styles.listContainer}>
        {sellers &&
          <FlatList
            data={sellers}
            renderItem={renderItem}
            keyExtractor={item => `item-group-${item.id}`}
          />}
      </View>
      <View>
        <Button handlePress={() => setOpen(true)} title='Создать' icon={<Ionicons name={'add'} size={26} color={Colors.white} />}></Button>
      </View>
      {open && <SellerCreateModal onDismiss={() => setOpen(false)} />}
    </View>

  );
};

export default SellerList;

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
    marginRight: 15
  }
});
