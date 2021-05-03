import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Colors from '../helpers/ColorHelper';

const Menu = ({ menuDetail: { name, routeName, imagePath }, width }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <View style={[styles.cell, width && { width }]}>
        <Image style={styles.image} source={imagePath} resizeMode="contain" />
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    margin: 0,
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  text: {
    color: Colors.textColor,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Menu;
