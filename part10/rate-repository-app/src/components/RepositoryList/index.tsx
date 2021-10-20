import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router-native';

import { RepositoryItem } from './RepositoryItem';
import {
  AllRepositoriesOrderBy,
  OrderDirection,
  Repository,
} from '../../generated/graphql';
import { useRepositories } from '../../hooks/useRepositories';
import { GetRepositoriesQuery } from '../../generated/graphql';
import { Picker } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

type OrderPickerProps = {
  selectedOrder: any;
  setSelectedOrder: React.Dispatch<React.SetStateAction<ItemValue | undefined>>;
};

export const OrderPicker: React.FC<OrderPickerProps> = ({
  selectedOrder,
  setSelectedOrder,
}) => {
  return (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue, _itemIndex) => {
        console.log(setSelectedOrder);
        setSelectedOrder(itemValue);
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

type RepositoryListContainerProps = {
  repositories: GetRepositoriesQuery['repositories'] | undefined;
  selectedOrder: {
    selectedOrder: any;
    setSelectedOrder: React.Dispatch<
      React.SetStateAction<ItemValue | undefined>
    >;
  };
};

export const RepositoryListContainer: React.FC<RepositoryListContainerProps> =
  ({ repositories, selectedOrder }) => {
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
        ListHeaderComponent={
          <OrderPicker
            selectedOrder={selectedOrder.selectedOrder}
            setSelectedOrder={selectedOrder.setSelectedOrder}
          />
        }
      />
    );
  };

export const RepositoryList = () => {
  type orderOption = 'latest' | 'highest' | 'lowest';

  const orderToOption = (orderOption: orderOption | undefined = 'latest') => {
    return {
      orderBy:
        orderOption === 'latest'
          ? AllRepositoriesOrderBy.CreatedAt
          : AllRepositoriesOrderBy.RatingAverage,
      orderDirection:
        orderOption === 'lowest' ? OrderDirection.Asc : OrderDirection.Desc,
    };
  };

  const [selectedOrder, setSelectedOrder] = useState<ItemValue>();
  const { repositories } = useRepositories({
    ...orderToOption(selectedOrder as orderOption),
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={{ selectedOrder, setSelectedOrder }}
    />
  );
};
