import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../helpers/ColorHelper';

const ConfirmOverlay = ({ visible, handleYes, handleNo, message }) => {
  return (
    <Overlay isVisible={visible}>
      <View style={styles.container}>
        <Text>{message}</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleNo}
            title="No"
            buttonStyle={styles.noButtonStyle}
            titleStyle={styles.buttonTitleStyle}
          />
          <Button
            onPress={handleYes}
            title="Yes"
            buttonStyle={styles.yesButtonStyle}
            titleStyle={styles.buttonTitleStyle}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yesButtonStyle: {
    backgroundColor: Colors.yesButton,
  },
  noButtonStyle: {
    backgroundColor: Colors.noButton,
  },
  buttonTitleStyle: {
    color: Colors.textColor,
  },
});

export default ConfirmOverlay;
