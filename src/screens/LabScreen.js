import React from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Container from '../components/Container';
import { LAB_RESULTS } from '../helpers/LabHelper';
import moment from 'moment';
import Colors from '../helpers/ColorHelper';

const LabScreen = () => {
  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.cellOne, styles.header]}>Chemistry</Text>
            <Text style={[styles.cellTwo, styles.header]}>
              {moment().add(-1, 'days').format('MM/DD/YYYY')}
            </Text>
            <Text style={[styles.cellThree, styles.header]}>
              {moment().format('MM/DD/YYYY')}
            </Text>
          </View>
          <FlatList
            data={LAB_RESULTS}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.chemistry.toString()}
            renderItem={({ item, index }) => (
              <ListItem
                bottomDivider={true}
                containerStyle={[
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
              >
                <ListItem.Content>
                  <View style={styles.rowContainer}>
                    <Text style={styles.cellOne}>{item.chemistry}</Text>
                    <Text style={styles.cellTwo}>{item.resultOne}</Text>
                    <Text style={styles.cellThree}>{item.resultTwo}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </View>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: Colors.headerBackgroundColor,
  },
  header: {
    color: Colors.textColor,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  cellOne: {
    width: '40%',
    textAlign: 'left',
  },
  cellTwo: {
    width: '30%',
    textAlign: 'center',
  },
  cellThree: {
    width: '30%',
    textAlign: 'center',
  },
  oddRow: {
    backgroundColor: Colors.rowOddColor,
  },
  evenRow: {
    backgroundColor: Colors.rowEvenColor,
  },
});

export default LabScreen;
