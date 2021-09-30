import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router-native';

import { RepositoryItem } from './RepositoryItem';
import { AllRepositoriesOrderBy, Repository } from '../../generated/graphql';
import { useRepositories } from '../../hooks/useRepositories';
import { GetRepositoriesQuery } from '../../generated/graphql';
import { Picker } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

type RepositoryListContainerProps = {
  repositories: GetRepositoriesQuery['repositories'] | undefined;
};

export const OrderPicker = () => {
  const [selectedOrder, setSelectedOrder] = useState<ItemValue>();

  return (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue, _itemIndex) => setSelectedOrder(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export const RepositoryListContainer: React.FC<RepositoryListContainerProps> =
  ({ repositories }) => {
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node as Repository)
      : [];
    const history = useHistory();

    const ItemSeparator = () => <View style={styles.separator} />;
    const renderItem = ({ item }: { item: Repository }) => {
      const onPress = () => {
        history.push(`/repositories/${item.id}`);
      };

      return (
        <Pressable onPress={onPress}>
          <RepositoryItem repository={item} />
        </Pressable>
      );
    };

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={OrderPicker}
      />
    );
  };

export const RepositoryList = () => {
  const { repositories } = useRepositories({
    orderBy: AllRepositoriesOrderBy.RatingAverage,
  });
  return <RepositoryListContainer repositories={repositories} />;
};
