import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Text } from './Text';
import { theme } from '../theme';
import { Repository } from '../types';
import { Badge } from './Badge';

type RepositoryPropertyProps = {
  label: string;
  value: number;
};

const RepositoryProperty = ({ label, value }: RepositoryPropertyProps) => {
  const roundNum = (num: number) => {
    return num >= 1000 ? `${Math.floor(num / 100) / 10} k` : String(num);
  };

  const style = {
    propertyContainer: {
      flexGrow: 1,
    },
    propertyText: {
      textAlign: 'center' as const,
    },
  };

  return (
    <View style={style.propertyContainer}>
      <Text fontWeight="bold" style={style.propertyText}>
        {roundNum(value)}
      </Text>
      <Text color="textSecondary" style={style.propertyText}>
        {label}
      </Text>
    </View>
  );
};

export const RepositoryItem = ({ repository }: { repository: Repository }) => {
  const style = {
    cardContainer: {
      padding: 10,
      backgroundColor: theme.backgroundColors.white,
    },
    cardTop: {
      flexDirection: 'row' as const,
    },
    cardTopRight: {
      marginLeft: 10,
    },
    cardBottom: {
      flexDirection: 'row' as const,
      textAlign: 'center',
      marginTop: 10,
    },
    avatorImage: {
      width: 50,
      height: 50,
      borderRadius: 5,
    },
  };

  return (
    <View style={style.cardContainer}>
      <View style={style.cardTop}>
        <View>
          <Image
            style={style.avatorImage}
            source={{
              uri: repository.ownerAvatarUrl,
            }}
          />
        </View>
        <ScrollView style={style.cardTopRight}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <Badge>{repository.language}</Badge>
        </ScrollView>
      </View>
      <View style={style.cardBottom}>
        <RepositoryProperty label="Stars" value={repository.stargazersCount} />
        <RepositoryProperty label="Forks" value={repository.forksCount} />
        <RepositoryProperty label="Reviews" value={repository.reviewCount} />
        <RepositoryProperty label="Rating" value={repository.ratingAverage} />
      </View>
    </View>
  );
};
