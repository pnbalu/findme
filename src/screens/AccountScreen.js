import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Container from '../components/Container';
import { EvilIcons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAsyncStorage from '../hooks/useAsyncStorage';
import Loader from '../components/Loader';
import { USER_DETAIL } from '../helpers/ConstantHelper';
import { useNavigation } from '@react-navigation/native';
import Colors from '../helpers/ColorHelper';
import Logo from '../components/Logo';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const [userDetail, loading] = useAsyncStorage(USER_DETAIL);
  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account Details</Text>
        <Logo />
      </View>
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <SafeAreaView style={styles.outerContainer}>
          {loading ? (
            <Loader />
          ) : (
            <View style={styles.innerContainer}>
              <EvilIcons name="user" size={200} color="white" />
              <View style={styles.userDetail}>
                <Text style={styles.userName}>
                  {userDetail.firstName} {userDetail.lastName}
                </Text>
                <View style={styles.row}>
                  <MaterialIcons name="email" size={24} color="yellow" />
                  <Text style={styles.email}>{userDetail.emailId}</Text>
                </View>
                <View style={styles.row}>
                  <FontAwesome name="phone" size={24} color="yellow" />
                  <Text style={styles.phoneNumber}>
                    {userDetail.phoneNumber ?? 'Not Available'}
                  </Text>
                </View>
              </View>
              <Spacer>
                <Button
                  title="Change Password"
                  onPress={() =>
                    navigation.navigate('Account', {
                      screen: 'ChangePassword',
                      params: { id: userDetail.id },
                    })
                  }
                />
              </Spacer>
              <TouchableOpacity onPress={signout}>
                <Spacer>
                  <Text style={styles.signout}>Sign Out</Text>
                </Spacer>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    elevation: 10,
    backgroundColor: Colors.headerBackgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
  },
  headerTitle: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  mainContainer: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textColor,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  email: {
    fontSize: 16,
    color: Colors.textColor,
    paddingLeft: 10,
  },
  phoneNumber: {
    fontSize: 16,
    color: Colors.textColor,
    paddingLeft: 10,
  },
  signout: {
    color: Colors.linkColor,
    fontSize: 16,
  },
});

export default AccountScreen;
