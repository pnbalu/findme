import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../helpers/ColorHelper';

const DoctorItem = ({ doctor, isHorizontal }) => (
  <View style={[styles.container, isHorizontal && styles.isHorizontal]}>
    <View style={styles.nameContainer}>
      <Text style={styles.name}>
        Dr. {doctor.firstName} {doctor.lastName}
      </Text>
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.bold}>{doctor.speciality}</Text>
      <Text>{doctor.addressLine1}</Text>
      <Text>{`${doctor.city} ${doctor.state} ${doctor.zipCode}`}</Text>
      <Text>{`NPI: ${doctor.nationalProviderNumber}`}</Text>
    </View>
    <View style={styles.phoneNumberContainer}>
      <FontAwesome name="phone" size={20} color="grey" />
      <Text style={styles.phoneNumber}>{doctor.phoneNumber1}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.textColor,
    elevation: 10,
    shadowOpacity: 1,
  },
  nameContainer: {
    backgroundColor: Colors.headerBackgroundColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center',
    color: Colors.textColor,
  },
  detailContainer: {
    padding: 10,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.rowOddColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  phoneNumber: {
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  isHorizontal: {
    marginRight: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DoctorItem;
