import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Alert,
  LogBox,
} from 'react-native';
import Container from '../components/Container';
import GeoFencing from 'react-native-geo-fencing';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore';
import Storage from 'react-native-storage';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';
import Colors from '../helpers/ColorHelper';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});
const firebaseConfig = {
  apiKey: 'AIzaSyA_gYXx40COJH68wCsgYq4Ad6mCvY-Xykk',
  authDomain: 'findme-d0ca7.firebaseapp.com',
  databaseURL: 'https://findme-d0ca7-default-rtdb.firebaseio.com',
  projectId: 'findme-d0ca7',
  storageBucket: 'findme-d0ca7.appspot.com',
  messagingSenderId: '1039056751879',
  appId: '1:1039056751879:web:b74ef0c3a7fe14c4d589a2',
  measurementId: 'G-XRX2M9151Y',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const findme = db.collection('Findme');

const VitalScreen = () => {
  const [fences, setFences] = useState(null);
  const [number, onChangeNumber] = React.useState(null);
  async function readFence() {
    const data = await findme.get();
    data.docs.forEach(item => {
      //console.log("-------------------cc-------------------"+JSON.stringify(item.data()));
      const fenceData = item.data().fenceA;
      console.log(
        '-------------------cc-------------------' + JSON.stringify(fenceData)
      );
      const geo = JSON.parse(fenceData);
      console.log('-------------------cc-------------------' + geo.fence);
      storage.save({ key: 'fe', data: geo, expires: 1000 * 3600 });
    });
  }

  //console.log("----------------u--------------"+JSON.stringify(findme));
  const componentDidMount = () => {
    storage
      .load({
        key: 'fe',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true,
        },
      })
      .then(ret => {
        try {
          // found data go to then()
          console.log('---------yyyy-----------' + JSON.stringify(ret.fence));
          var polygonArray; /*= [
			
        {lng:
                -104.67352867126465,
               lat:   39.584556979225084
              },
              {lng:
                -104.67174768447876,
                lat:  39.58295286133047
              },
              {lng:
                -104.67110395431519,
               lat:   39.58373425329381
              },
              {lng:
                -104.67277228832245,
                lat:  39.58504895639645
              },
              {lng:
                -104.67352867126465,
                lat:  39.584556979225084
              }
      ];*/
          polygonArray = ret.fence;
          console.log('----------zzz----------' + polygonArray);
          navigator.geolocation.getCurrentPosition(
            position => {
              let point = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              let x = position.coords.latitude;
              let y = position.coords.longitude;

              let inside = false;
              for (
                let i = 0, j = polygonArray.length - 1;
                i < polygonArray.length;
                j = i++
              ) {
                console.log(
                  '###########################' + polygonArray[i].lat
                );
                console.log('###########################' + polygonArray[i]);
                let xLat = polygonArray[i].lat;
                let yLat = polygonArray[i].lng;
                let xLon = polygonArray[j].lat;
                let yLon = polygonArray[j].lng;

                let intersect =
                  yLat > y !== yLon > y &&
                  x < ((xLon - xLat) * (y - yLat)) / (yLon - yLat) + xLat;
                if (intersect) inside = !inside;
              }

              console.log('-----inside---------' + inside);

              alert(inside);
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } catch (Exception) {
          console.log(Exception);
        }
      })
      .catch(err => {
        readFence();
      });

    // console.log(JSON.stringify( AsyncStorage.getItem('fence')));
  };
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tracker</Text>
      </View>
      <KeyboardAwareContainer>
        <SafeAreaView style={styles.outerContainer}>
          <View style={styles.innerContainer} />
          <Text> </Text>
          <TextInput
            style={styles.input}
            value={number}
            placeholder="Enter the tracker Id"
          />
          <Button onPress={componentDidMount} title="Press Me" />
        </SafeAreaView>
      </KeyboardAwareContainer>
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
  viewContainer: {
    marginTop: 24,
    padding: 24,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
  },
});

export default VitalScreen;
