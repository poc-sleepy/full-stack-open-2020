import React from 'react';
import { Text } from './Text';
import { theme } from '../theme';

export const Badge = (props: { children: any }) => {
  const style = {
    outerBadge: {
      marginTop: 10,
      marginBottom: 10,
    },
    innerBadge: {
      color: theme.backgroundColors.white,
      backgroundColor: theme.backgroundColors.primary,
      padding: 6,
      borderRadius: 6,
    },
  };

  return (
    <Text style={style.outerBadge}>
      <Text style={style.innerBadge}>{props.children}</Text>
    </Text>
  );
};
