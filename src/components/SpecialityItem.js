import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Colors from '../helpers/ColorHelper';

const SpecialityItem = ({ speciality, doctors }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Doctor', {
      screen: 'SpecialityDoctor',
      params: { speciality, doctors },
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <ListItem containerStyle={styles.container}>
        <Avatar
          rounded={true}
          title={`${doctors.length}`}
          containerStyle={styles.noImageAvatar}
        />
        <ListItem.Content>
          <ListItem.Subtitle>{speciality}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron size={24} />
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
  },
  noImageAvatar: {
    backgroundColor: Colors.noImageAvatarColor,
  },
});

export default SpecialityItem;
