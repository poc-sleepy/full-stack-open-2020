import React from 'react';
import { Text, View } from 'react-native';
import { Repository } from './types';

export const RepositoryItem = ({ repository }: { repository: Repository }) => (
  <View>
    <Text>Full Name: {repository.fullName}</Text>
    <Text>Description: {repository.description}</Text>
    <Text>Language: {repository.language}</Text>
    <Text>Stars: {repository.stargazersCount}</Text>
    <Text>Forks: {repository.forksCount}</Text>
    <Text>Reviews: {repository.reviewCount}</Text>
    <Text>Rating: {repository.ratingAverage}</Text>
  </View>
);
