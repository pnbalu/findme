import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { useNavigation } from '@react-navigation/native';
import Colors from '../helpers/ColorHelper';

const NavLink = ({ text, routeName }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Colors.linkColor,
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default NavLink;
