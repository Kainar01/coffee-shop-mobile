import { StackScreenProps } from '@react-navigation/stack';
import sellerApi from 'api/seller/api';
import { Button } from 'components/Button';
import { errorHandler } from 'features/error/utils';
import { SellerTabParamList } from 'features/seller';
import { SellerCartStackParamList } from 'features/seller/navigators/Cart';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Image, Text } from 'react-native-elements';
import { CartItem } from '../user-cart';


const noImagePhoto = '../../../../../assets/no-image1.png'

const UserCheckout = ({ route, navigation }: StackScreenProps<SellerCartStackParamList & SellerTabParamList, 'UserCheckout'>) => {

  const [purchase, { isLoading }] = sellerApi.endpoints.purchase.useMutation()
  const cartItems = route.params?.cartItems as Array<CartItem>
  const total = route.params?.total as number
  const discount = route.params?.discount as number
  const username = route.params?.username as string


  const renderItem = ({ item }: Record<'item', CartItem>) => {
    const { image, title, price, quantity } = item

    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.container} >
          <Image
            style={styles.image}
            source={image ? {
              uri: image,
            } : require(noImagePhoto)}
          />
          <View >
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text style={styles.title}>{price} тг * {quantity} штук = {Number(price) * Number(quantity)}</Text>
          </View>
        </View>
      </Card>
    )
  }

  const handlePurchase = () => {
    purchase({ username, total: total, cartItems }).unwrap().then(() => { navigation.popToTop(); navigation.navigate('SellerSales') }).catch(errorHandler)
  }

  // renders
  return (
    <View style={styles.contentContainer}>
      <View style={styles.listContainer}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(itemGroup: CartItem) => `item-${itemGroup.id}`} />
      </View>
      <Card containerStyle={styles.infoContainer}>
        <Text style={styles.title}>Итого: {total + discount} тг</Text>
        <Text style={styles.title}>Итого со скидкой 5%: {total} тг</Text>
        <Button extraStyles={styles.button} disabled={isLoading} title="Завершить" handlePress={handlePurchase} />
        <Button disabled={isLoading} title="Отменить" handlePress={() => navigation.popToTop()} />
      </Card>
    </View>
  );
};

export default UserCheckout;

const styles = StyleSheet.create({
  infoContainer: {
    margin: 0,
    borderRadius: 8
  },
  contentContainer: {
    padding: 8,
    height: '100%'
  },
  listContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row'
  },
  cardContainer: {
    borderRadius: 8,
    margin: 0,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginBottom: 10
  }
})

