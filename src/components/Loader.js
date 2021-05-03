import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../helpers/ColorHelper';

const Loader = () => (
  <ActivityIndicator size="large" color={Colors.loaderColor} />
);

export default Loader;
