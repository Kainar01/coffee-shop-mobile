import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import adminApi from 'api/admin/api';
import { Button } from 'components/Button';
import { AdminFranchiseStackParamList } from 'features/admin/navigators/Franchise';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Franchise } from '../../admin.interface';

const Item = ({ name, onPress }: Pick<Franchise, 'name'> & { onPress: () => void }) => (
  <Pressable onPress={onPress}>
    <View style={styles.item}>
      <Text numberOfLines={1} style={styles.title}>{name}</Text>
    </View>
  </Pressable>
);

const AdminFranchiseList = () => {
  const navigation = useNavigation<StackNavigationProp<AdminFranchiseStackParamList>>()

  const { data: franchises } = adminApi.endpoints.getFranchises.useQuery(null)

  const renderItem = ({ item }: Record<'item', Franchise>) => (
    <Item name={item.name} onPress={() => navigation.navigate('AdminFranchiseStats', { franchiseId: item.id })} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {franchises &&
          <FlatList
            data={franchises}
            renderItem={renderItem}
            keyExtractor={item => `franchise-${item.id}`}
          />}
      </View>
      <View>
        <Button handlePress={() => navigation.navigate('AdminFranchiseCreate')} title='Создать' icon={<Ionicons name={'add'} size={26} color={Colors.white} />}></Button>
      </View>
    </View>
  );
};

export default AdminFranchiseList;

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
