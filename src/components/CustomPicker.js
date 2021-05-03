import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CustomPicker = ({ items, value, setValue, placeholder }) => {
  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={items}
      value={value}
      onValueChange={setValue}
      style={{ ...pickerSelectStyles, iconContainer: styles.iconContainer }}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return <View style={styles.icon} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    top: 16,
    right: 10,
  },
  icon: {
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'gray',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    color: 'black',
    paddingRight: 30,
  },
});

export default CustomPicker;
