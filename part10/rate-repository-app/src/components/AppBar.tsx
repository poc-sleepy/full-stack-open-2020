import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import { Text } from './Text';
import { theme } from '../theme';
import { Link } from 'react-router-native';
import { useGetAuthorizedUserQuery } from '../generated/graphql';

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
  const { data } = useGetAuthorizedUserQuery({
    fetchPolicy: 'cache-and-network',
  });
  const user = data?.authorizedUser;
  console.log(user);

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
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {!user && <AppBarTab to="/signin">Sign In</AppBarTab>}
        {user && <AppBarTab to="/reviews/create">Create a review</AppBarTab>}
        {user && <AppBarTab to="/signout">Sign Out</AppBarTab>}
        {user && <Text color="inverse">Logged In as {user?.username}</Text>}
      </ScrollView>
    </View>
  );
};
