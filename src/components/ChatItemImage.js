import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ChatItemImage = ({ image }) => {
  return (
    <>
      {image ? (
        <Image style={styles.image} source={image} resizeMode="contain" />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
});

export default ChatItemImage;
