import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { MAX_TEXT_INPUT_HEIGHT } from '../helpers/ConstantHelper';
import Colors from '../helpers/ColorHelper';

const CustomInput = props => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          props.multiline && {
            maxHeight: Math.min(
              MAX_TEXT_INPUT_HEIGHT,
              Math.max(35, props.height)
            ),
          },
          hasError && styles.errorInput,
        ]}
        disableFullscreenUI={false}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.errorTextColor,
    alignSelf: 'flex-start',
  },
  errorInput: {
    borderColor: Colors.errorTextColor,
  },
});

export default CustomInput;
