import React, { useContext, useEffect } from 'react';
import Container from '../components/Container';
import { Context as AuthContext } from '../contexts/AuthContext';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('[ResolveAuthScreen] - Rendered');

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ResolveAuthScreen;
