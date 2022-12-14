import { UserPurchaseItem } from 'api/seller/types';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Image, Text } from 'react-native-elements';

type Props = {
  items: Array<UserPurchaseItem>
  onItemGroupChange: (id: number) => void
}

const noImagePhoto = '../../../../../assets/no-image1.png'

const UserItemList = ({ items, onItemGroupChange }: Props) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {items.map(({ image, id, title, price, bought, itemGroupId }) => (
        <Pressable key={id} onPress={() => onItemGroupChange(itemGroupId)}>
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
                <Text style={styles.title}>{price} тг</Text>
                <Text >{bought} куплено</Text>
              </View>
            </View>
          </Card>
        </Pressable>

      ))}
    </ScrollView >
  );
};

export default UserItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  cardContainer: {
    borderRadius: 8,
    margin: 0,
    marginRight: 8,
    justifyContent: 'center'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100
  }
})