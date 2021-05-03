import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

export default () => {
  const [document, setDocument] = useState(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      console.log(result);
      setDocument(result);
    }
  };

  return [document, setDocument, pickDocument];
};
