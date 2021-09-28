import React from 'react';
import { useParams } from 'react-router';
import { useRepository } from '../hooks/useRepository';
import { Repository } from '../generated/graphql';
import { RepositoryItem } from './RepositoryList/RepositoryItem';
import { Text } from './Text';

export const SingleRepository = () => {
  const id = useParams<{ id: string }>().id;
  const { repository, loading } = useRepository(id);

  return !loading ? (
    <RepositoryItem repository={repository as Repository} isSingle={true} />
  ) : (
    <Text>Loading...</Text>
  );
};
