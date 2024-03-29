import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import { RepositoryList } from './RepositoryList';

import { AppBar } from './AppBar';
import { theme } from '../theme';
import { SignIn } from './SignIn';
import { SignOut } from './SignOut';
import { SingleRepository } from './SingleRepository';
import { CreateReview } from './CreateReview';
import { SignUp } from './SignUp';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.lightGray,
  },
});

export const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/reviews/create" exact>
          <CreateReview />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/signout" exact>
          <SignOut />
        </Route>
        <Route path="/repositories/:id" exact>
          <SingleRepository />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};
