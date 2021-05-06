import React, { useState }  from 'react';
import { SafeAreaView, StyleSheet, View,Button ,Text, TextInput,Alert,LogBox} from 'react-native';
import Container from '../components/Container';
import GeoFencing from 'react-native-geo-fencing';
import * as firebase from 'firebase'
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
  sync: {
  }
});
const firebaseConfig = {
  apiKey: "AIzaSyA_gYXx40COJH68wCsgYq4Ad6mCvY-Xykk",
  authDomain: "findme-d0ca7.firebaseapp.com",
  databaseURL: "https://findme-d0ca7-default-rtdb.firebaseio.com",
  projectId: "findme-d0ca7",
  storageBucket: "findme-d0ca7.appspot.com",
  messagingSenderId: "1039056751879",
  appId: "1:1039056751879:web:b74ef0c3a7fe14c4d589a2",
  measurementId: "G-XRX2M9151Y"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();
const findme = db.collection('Findme');


const VitalScreen = () => {
  const [allfences, setAllFences] = React.useState([{name:'',fence:{latitude:0,longitude:0}}]);
  const [fences, setFences] = useState(null)
  const [name, setName] = React.useState(null);
  const [track, setTrack] = React.useState(false);
  const [startTracking, setStartTracking] = React.useState(false);
  const [stopTracking, setStopTracking] = React.useState(false);
  const [disableTracker, setDisableTracker] = React.useState(true);

  async function readFence() {
    const data=await findme.get();
    setAllFences( data.docs);
    data.docs.forEach(item=>{ 
      const fenceData =(item.data().fenceA);
     
      console.log("-------------------getting fence data-------------------"+JSON.stringify(fenceData));
      const geo = JSON.parse(fenceData);
      if(geo.tracker.includes(name)){
        console.log("-------------------Tracker Added------------------"+name);
        //alert('true');
        storage.save({ key: 'fen',data:geo,expires: 1000 * 3600});    
        setDisableTracker(false);  
      }     
    })
   }
   var timeoutId;  
  
   const startTrack=()=> { 
     timeoutId = setInterval(    () => { componentDidMount();}, 60000*5);
     console.log("--------------Start------------------")
   }

   const stopTrack=()=> { 
    clearInterval(timeoutId);
    console.log("--------------Stop------------------")
    storage.remove({
      key: 'fen'
    });
   }
   const clearCache=()=> {  
    setDisableTracker(true); 
    setTrack(false);  
    console.log("--------------Clear Cache------------------")
    storage.remove({
      key: 'fen'
    });
   }


  
   
  const componentDidMount=()=> {    
   setTrack(true);
    storage.load({
        key: 'fen',
      autoSync: true,
        syncInBackground: true,   
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true
        }
    })
    .then(ret => {
      try{
      // found data go to then()
      console.log("---------yyyy-----------"+JSON.stringify(ret.fence));
      var polygonArray ;
      polygonArray=ret.fence;
      console.log("----------zzz----------"+polygonArray);
      console.log("----------zzz----------"+name);
      navigator.geolocation.getCurrentPosition(
      (position) => {
        let point = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
     
        let x = position.coords.latitude
        let y = position.coords.longitude
  
        let inside = false
        for (let i = 0, j = polygonArray.length - 1; i < polygonArray.length; j = i++) {
          let xLat = polygonArray[i].latitude
          let yLat = polygonArray[i].longitude
          let xLon = polygonArray[j].latitude
          let yLon = polygonArray[j].longitude
  
          let intersect = ((yLat > y) !== (yLon > y)) && (x < (xLon - xLat) * (y - yLat) / (yLon - yLat) + xLat)
          if (intersect) inside = !inside
        }
        
        console.log("-----inside---------"+inside);
        const today = new Date();
        const positions = { lat: position.coords.latitude, lon: position.coords.longitude };
        console.log("-----name---------"+name);
        if(inside){
          /*  firebase.firestore()
            .collection('TrackHistory')
            .add({today,positions,name})
            .then(() => {
              console.log('User added!');
            });*/

            firebase.firestore()
            .collection('TrackerData')
            .doc(name)
            .set({today,positions,name})           
            .then(() => {
              console.log('Data added!');
            });
        //alert(inside);
          }else{
            const db = firebase.firestore();
            var cityRef = db.collection('TrackerData').doc(name);
            var removeCapital = cityRef.update({
                capital: firebase.firestore.FieldValue.delete()
            });
          }
    
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }catch(Exception ){
      console.log(Exception)
    }
    }).catch(err => {
      setTrack(false);
      readFence();
    });
  
    
   // console.log(JSON.stringify( AsyncStorage.getItem('fence')));
    
  
      

	}
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tracker</Text>
       
      </View>
    <KeyboardAwareContainer>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}/>
		<Text> </Text>
    <TextInput
        style={styles.input}
        value={name}
        onChangeText={name=> setName(name)}
        placeholder="Enter the tracker Id"  
        editable={disableTracker}   
      />
		<Button
      style={styles.button}
		  onPress={componentDidMount}
		  title="Add the Tracker Key"
      disabled={track}
		/>
    	<Button
      style={styles.button}
		  disabled={startTracking}
		  title="Start Tracking"
      onPress={()=>{startTrack();setStartTracking(true);setStopTracking(false)}}
		/>
    	<Button
      style={styles.button}
		  disabled={stopTracking}
		  title="Stop Tracking"
      onPress={()=>{stopTrack();setStopTracking(true);setStartTracking(false)}}
		/>
    	<Button
      style={styles.button}
		  title="Clear Caching"
      onPress={()=>{clearCache();}}
		/>
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
    backgroundColor:'#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor:'#000000',
  },
  button: {
    width: '50%',
    backgroundColor:'#000000',
  },
});

export default VitalScreen;
