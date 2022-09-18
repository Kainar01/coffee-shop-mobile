import { StackScreenProps } from '@react-navigation/stack';
import sellerApi from 'api/seller/api';
import { Button } from 'components/Button';
import { Item } from 'features/admin/admin.interface';
import { SellerCartStackParamList } from 'features/seller/navigators/Cart';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ItemGroupList } from './ItemGroupList';
import { ItemList } from './ItemList';
import UserItemList from './UserItemList';
export interface CartItem extends Pick<Item, 'id' | 'price' | 'title' | 'image'> {
  quantity: number;
}

const UserCart = ({ route, navigation }: StackScreenProps<SellerCartStackParamList, 'UserCart'>) => {
  const [itemGroupId, setItemGroupId] = useState<number>(0)
  const [selectedItems, setSelectedItems] = useState<Record<number, CartItem>>({})
  const username = route.params?.username as string

  const { data: userItems } = sellerApi.endpoints.getUserItems.useQuery(username)
  const { data: itemGroups } = sellerApi.endpoints.getItemGroups.useQuery(null)
  const { data: items } = sellerApi.endpoints.getGroupItems.useQuery(itemGroupId, { skip: itemGroupId === 0 })


  useEffect(() => {
    if (itemGroupId === 0)
      setItemGroupId(itemGroups?.[0]?.id || 0)
  }, [itemGroups])

  useEffect(() => {
    navigation.setOptions({ headerTitle: `Корзина пользователя ${username}` })
  }, [])

  const handleDecrement = (item: Item) => {
    const cartItem = selectedItems[item.id]
    if (cartItem) {
      setSelectedItems({
        ...selectedItems, [item.id]: { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
      })
    }
  }

  const handleIncrement = (item: Item) => {
    const cartItem = selectedItems[item.id]
    if (cartItem) {
      setSelectedItems({
        ...selectedItems, [item.id]: {
          ...cartItem, quantity: cartItem.quantity + 1
        }
      })
    } else {
      setSelectedItems({
        ...selectedItems, [item.id]: {
          id: item.id, price: item.price, title: item.title, image: item.image, quantity: 1
        }
      })
    }
  }

  const cartItems: Array<CartItem> = useMemo(() => Object.values(selectedItems).filter(item => item.quantity > 0), [selectedItems])

  const totalWithoutDiscount = cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)

  const discount = 0.05 * totalWithoutDiscount

  const total = totalWithoutDiscount - discount

  return (
    <View style={styles.container}>
      <View>

        {userItems?.mostBought && userItems?.mostBought.length > 0 && <>
          <Text style={styles.title}>Часто покупаемые</Text>
          <UserItemList items={userItems?.mostBought} />
        </>}
        {userItems?.favorites && userItems?.favorites.length > 0 && <>
          <Text style={styles.title}>Избранное</Text>
          <UserItemList items={userItems?.favorites} />
        </>}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}> Каталог</Text>
        {itemGroups && <ItemGroupList itemGroups={itemGroups} onPickItemGroup={(id) => setItemGroupId(id)} selected={itemGroupId} />}

        {items && <ItemList items={items} selected={selectedItems} onQuantityDecrement={handleDecrement} onQuantityIncrement={handleIncrement} />}
      </View>

      {cartItems.length > 0 && <Button handlePress={() => navigation.navigate('UserCheckout', { cartItems, total, username, discount })} title="Закончить заказ" />}
    </View>
  );
};

export default UserCart;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  itemGroupContainer: {
    marginBottom: 0
  }
})

