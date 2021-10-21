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
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce/lib';

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
  searchQuery: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  };
  selectedOrder: {
    selectedOrder: any;
    setSelectedOrder: React.Dispatch<
      React.SetStateAction<ItemValue | undefined>
    >;
  };
};

export const RepositoryListContainer: React.FC<RepositoryListContainerProps> =
  ({ repositories, searchQuery, selectedOrder }) => {
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node as Repository)
      : [];
    const history = useHistory();

    const onChangeSearch = (query: string) => {
      searchQuery.setSearchQuery(query);
      console.log(query);
    };

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
          <>
            <OrderPicker
              selectedOrder={selectedOrder.selectedOrder}
              setSelectedOrder={selectedOrder.setSelectedOrder}
            />
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery.searchQuery}
            />
          </>
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

  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  const { repositories } = useRepositories({
    searchKeyword: debouncedSearchQuery,
    ...orderToOption(selectedOrder as orderOption),
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchQuery={{ searchQuery, setSearchQuery }}
      selectedOrder={{ selectedOrder, setSelectedOrder }}
    />
  );
};
