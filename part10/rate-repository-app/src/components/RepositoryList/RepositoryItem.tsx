import React from 'react';
import { View, Image, ScrollView, Button } from 'react-native';
import { openURL } from 'expo-linking';
import { Text } from '../Text';
import { theme } from '../../theme';
import { Badge } from '../Badge';
import { ReviewList } from '../ReviewList';
import { Repository } from '../../generated/graphql';

type RepositoryPropertyProps = {
  label: string;
  value: number;
  testID?: string;
};

const RepositoryProperty = ({
  label,
  value,
  testID,
}: RepositoryPropertyProps) => {
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
      <Text testID={testID} fontWeight="bold" style={style.propertyText}>
        {roundNum(value)}
      </Text>
      <Text color="textSecondary" style={style.propertyText}>
        {label}
      </Text>
    </View>
  );
};

type RepositoryItemProps = {
  repository: Repository;
  isSingle?: boolean;
};

export const RepositoryItem: React.FC<RepositoryItemProps> = ({
  repository,
  isSingle,
}) => {
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
              uri: repository.ownerAvatarUrl ? repository.ownerAvatarUrl : '',
            }}
          />
        </View>
        <ScrollView style={style.cardTopRight}>
          <Text
            testID="repositoryFullName"
            fontSize="subheading"
            fontWeight="bold"
          >
            {repository.fullName}
          </Text>
          <Text testID="repositoryDescription" color="textSecondary">
            {repository.description}
          </Text>
          <Badge testID="repositoryLanguage">{repository.language}</Badge>
        </ScrollView>
      </View>
      <View style={style.cardBottom}>
        <RepositoryProperty
          testID="repositoryStargazers"
          label="Stars"
          value={repository.stargazersCount ? repository.stargazersCount : 0}
        />
        <RepositoryProperty
          testID="repositoryForks"
          label="Forks"
          value={repository.forksCount ? repository.forksCount : 0}
        />
        <RepositoryProperty
          testID="repositoryReviews"
          label="Reviews"
          value={repository.reviewCount}
        />
        <RepositoryProperty
          testID="repositoryRatingAverage"
          label="Rating"
          value={repository.ratingAverage}
        />
      </View>
      {isSingle && (
        <>
          <Button
            onPress={() => {
              repository.url && openURL(repository.url);
            }}
            title="Open In GitHub"
          />
          <ReviewList reviews={repository.reviews} />
        </>
      )}
    </View>
  );
};
