import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default key => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await AsyncStorage.getItem(key);
        setUserDetail(JSON.parse(user));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    bootstrapAsync();
  }, [key]);

  return [userDetail, loading];
};
