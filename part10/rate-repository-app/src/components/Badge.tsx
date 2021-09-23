import React from 'react';
import { Text } from './Text';
import { theme } from '../theme';

type BadgeProps = {
  children: any;
  testID?: string;
};

export const Badge: React.FC<BadgeProps> = (props) => {
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
    <Text testID={props.testID} style={style.outerBadge}>
      <Text style={style.innerBadge}>{props.children}</Text>
    </Text>
  );
};
