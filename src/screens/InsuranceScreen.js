import React, { useEffect, useState } from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import Container from '../components/Container';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';

const InsuranceScreen = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log(
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Button title="Pick an image from gallery" onPress={pickImage} />
          {image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          )}
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
  imageContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default InsuranceScreen;
