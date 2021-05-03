import React from 'react';
import { FlatList } from 'react-native';
import DoctorItem from './DoctorItem';

const DoctorList = ({ doctors, isHorizontal }) => (
  <FlatList
    data={doctors}
    horizontal={isHorizontal}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => (
      <DoctorItem doctor={item} isHorizontal={isHorizontal} />
    )}
  />
);

export default DoctorList;
