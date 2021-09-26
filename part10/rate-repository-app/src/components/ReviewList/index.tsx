import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import { ReviewItem } from './ReviewItem';
import { Review, ReviewConnection } from '../../generated/graphql';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

type ReviewListProps = {
  reviews: ReviewConnection;
};

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const ItemSeparator = () => <View style={styles.separator} />;
  const renderItem = ({ item }: { item: Review }) => {
    return <ReviewItem review={item} />;
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
