import React from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { theme } from '../../theme';
import { Review } from '../../generated/graphql';
import { format } from 'date-fns';

type ReviewItemProps = {
  review: Review;
};

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const style = {
    cardContainer: {
      padding: 10,
      backgroundColor: theme.backgroundColors.white,
    },
    cardTop: {
      flexDirection: 'row' as const,
    },
    cardTopleft: {
      width: 50,
      height: 50,
      borderColor: theme.borderColor.primary,
      borderWidth: 2,
      borderRadius: 25,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    cardTopRight: {
      marginLeft: 10,
    },
  };
  const createdAt = Date.parse(review.createdAt);

  return (
    <View style={style.cardContainer}>
      <View style={style.cardTop}>
        <View style={style.cardTopleft}>
          <Text color="primary" fontSize="subheading" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={style.cardTopRight}>
          <Text
            testID="reviewerUsername"
            fontSize="subheading"
            fontWeight="bold"
          >
            {review.user.username}
          </Text>
          <Text testID="reviewCreatedAt" color="textSecondary">
            {format(createdAt, 'dd.MM.yyyy')}
          </Text>
          <Text testID="reviewText">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};
