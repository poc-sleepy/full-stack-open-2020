import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Text } from './Text';
import { theme } from '../theme';
import { Link } from 'react-router-native';

const AppBarTab = (props: { children: string; to: string }) => {
  const styles = StyleSheet.create({
    container: {
      marginRight: 20,
    },
    // ...
  });

  return (
    <Link style={styles.container} to={props.to}>
      <Text color="inverse" fontSize="subheading" fontWeight="bold">
        {props.children}
      </Text>
    </Link>
  );
};

export const AppBar = () => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 20,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.backgroundColors.darkGray,
    },
    // ...
  });

  return (
    <View style={styles.container}>
      <AppBarTab to="/">Repositories</AppBarTab>
      <AppBarTab to="/signin">Sign In</AppBarTab>
    </View>
  );
};
