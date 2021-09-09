import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

import { Text } from './Text';
import { theme } from '../theme';

const AppBarTab = (props: { children: string }) => {
  const styles = StyleSheet.create({
    container: {
      marginRight: 20,
    },
    // ...
  });

  return (
    <Pressable style={styles.container}>
      <Text color="inverse" fontSize="subheading" fontWeight="bold">
        {props.children}
      </Text>
    </Pressable>
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
      <AppBarTab>Repositories</AppBarTab>
      <AppBarTab>About</AppBarTab>
    </View>
  );
};
