import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Container from '../components/Container';
import Menu from '../components/Menu';
import {
  FIRST_ROW_MENU,
  SECOND_ROW_MENU,
  THIRD_ROW_MENU,
  FOURTH_ROW_MENU,
} from '../helpers/MenuHelper';
import Colors from '../helpers/ColorHelper';
import Logo from '../components/Logo';

const { width: fullWidth } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <Logo />
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          {FIRST_ROW_MENU.map(item => (
            <Menu
              key={item.routeName}
              menuDetail={item}
              width={fullWidth / 3}
            />
          ))}
        </View>
        <View style={styles.row}>
          {SECOND_ROW_MENU.map(item => (
            <Menu
              key={item.routeName}
              menuDetail={item}
              width={fullWidth / 3}
            />
          ))}
        </View>
        <View style={styles.row}>
          {THIRD_ROW_MENU.map(item => (
            <Menu
              key={item.routeName}
              menuDetail={item}
              width={fullWidth / 3}
            />
          ))}
        </View>
        <View style={styles.row}>
          {FOURTH_ROW_MENU.map(item => (
            <Menu
              key={item.routeName}
              menuDetail={item}
              width={fullWidth / 3}
            />
          ))}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    elevation: 10,
    backgroundColor: Colors.headerBackgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
  },
  headerTitle: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 1,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default HomeScreen;
