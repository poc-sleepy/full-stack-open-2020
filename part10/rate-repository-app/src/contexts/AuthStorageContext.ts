import React from 'react';
import { AuthStorage } from '../utils/authStorage';

export const AuthStorageContext = React.createContext<AuthStorage>(
  new AuthStorage()
);
