import React from 'react';
import { Text } from 'react-native';
import { Repository } from './types';

export const RepositoryItem = (props: { repository: Repository }) => (
  <Text>{props.repository.id}</Text>
);
