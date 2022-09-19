import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import adminApi from 'api/admin/api';
import { AdminItemGroup } from 'api/admin/types';
import { Button } from 'components/Button';
import { NoData } from 'features/admin/components/NoData';
import { FranchiseItemStackParamList } from 'features/franchise/navigators/Items';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ItemGroupCreateModal } from './ItemGroupCreateModal';


const Item = ({ title, id, items, franchiseId }: AdminItemGroup & { franchiseId?: number }) => {
  const badgeColor = items > 10 ? '#008631' : (items > 5 ? '#1fd655' : '#83f28f')
  const navigation = useNavigation<StackNavigationProp<FranchiseItemStackParamList>>()

  return (
    <Pressable onPress={() => navigation.navigate('FranchiseItemList', { itemGroupId: id, itemGroupTitle: title, franchiseId: franchiseId as number })}>
      <View style={styles.item} >
        <View style={styles.itemTitle}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
        </View>
        <Text style={[styles.itemBadge, { color: badgeColor }]}>{items}</Text>
      </View>
    </Pressable>
  )
}


const FranchiseItemGroupList = () => {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const { data: itemGroups } = adminApi.endpoints.getItemGroups.useQuery(null)

  const renderItem = ({ item }: Record<'item', AdminItemGroup>) => (
    <Item {...item} franchiseId={user?.franchise?.id} />
  );

  return (

    <View style={styles.container}>
      <View style={styles.listContainer}>
        {itemGroups && itemGroups.length === 0 && <NoData title="У вас нет товаров этой группе" />}
        {itemGroups &&
          <FlatList
            data={itemGroups}
            renderItem={renderItem}
            keyExtractor={item => `item-group-${item.id}`}
          />}
      </View>
      <View>
        <Button handlePress={() => setOpen(true)} title='Создать' icon={<Ionicons name={'add'} size={26} color={Colors.white} />}></Button>
      </View>
      {open && <ItemGroupCreateModal onDismiss={() => setOpen(false)} />}
    </View>

  );
};

export default FranchiseItemGroupList;

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
    flex: 1,
  }
});
