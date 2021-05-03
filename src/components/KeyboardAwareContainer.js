import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Dimensions, View } from 'react-native';
import { StyleSheet } from 'react-native';
import Container from './Container';

const { height: fullHeight } = Dimensions.get('window');

const KeyboardAwareContainer = ({ children }) => {
  const [pageOffset, setPageOffset] = useState(0);

  const onLayout = ({ nativeEvent }) => {
    setPageOffset(fullHeight - nativeEvent.layout.height);
  };

  return (
    <Container>
      <View style={styles.viewContainer} onLayout={onLayout}>
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={pageOffset}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default KeyboardAwareContainer;
