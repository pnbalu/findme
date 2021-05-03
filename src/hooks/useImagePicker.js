import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { errorToast } from '../helpers/ToastHelper';
import { Platform } from 'react-native';

export default () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          errorToast(
            'Sorry, we need media library permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('console', result);
      setImage(result.uri);
    }
  };

  return [image, pickImage];
};
