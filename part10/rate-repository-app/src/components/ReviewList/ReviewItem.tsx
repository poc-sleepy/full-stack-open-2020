import React from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { theme } from '../../theme';
import { Review } from '../../generated/graphql';

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
          <Text>rate: {review.rating}</Text>
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
            {review.createdAt}
          </Text>
          <Text testID="reviewText">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};
