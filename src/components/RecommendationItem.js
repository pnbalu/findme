import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../helpers/ColorHelper';

const RecommendationItem = ({ recommendation, index }) => {
  return (
    <ListItem
      bottomDivider={true}
      containerStyle={index % 2 === 0 ? styles.evenRow : styles.oddRow}
    >
      <ListItem.Content>
        <ListItem.Title>{recommendation.recommendation}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  oddRow: {
    backgroundColor: Colors.rowOddColor,
  },
  evenRow: {
    backgroundColor: Colors.rowEvenColor,
  },
});

export default RecommendationItem;
