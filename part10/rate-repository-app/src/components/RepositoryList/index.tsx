import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { RepositoryItem } from './RepositoryItem';
import { Repository } from '../../types';
import { useRepositories } from '../../hooks/useRepositories';
import { GetRepositoriesQuery } from '../../generated/graphql';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

type RepositoryListContainerProps = {
  repositories: GetRepositoriesQuery['repositories'] | undefined;
};

export const RepositoryListContainer: React.FC<RepositoryListContainerProps> =
  ({ repositories }) => {
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node as Repository)
      : [];

    const ItemSeparator = () => <View style={styles.separator} />;
    const renderItem = ({ item }: { item: Repository }) => (
      <RepositoryItem repository={item} />
    );

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

export const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};
