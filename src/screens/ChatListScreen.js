import React, { useEffect, useState } from 'react';
import { View,  StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { firebase } from '../helpers/Firebaseconfig';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
const ChatListScreen = () => {
  // const [state, setState] = React.useState(null);
  const [markerr, setMarkerr] = React.useState({markers: [{title: 'Test', coordinates: {
    latitude: 39.584239414374544,
    longitude: -104.6727005392313
  }}] });

  const [allfences, setAllFences] = React.useState([
    {name:'',
    fence:[{latitude:0,longitude:0}]}]
    );
//------------------------------------------------
  async function readFence() {
    var afences =[];
    const db = firebase.firestore();
    const findme = db.collection('Findme');
    const data=await findme.get();
    data.docs.forEach(item=>{ 
      var d= JSON.parse(item.data().fenceA)
      afences.push( {name:item.data().name,fence:d.fence});
    })
    console.log('---------------Fence Data----------' +  JSON.stringify( afences) );   
    setAllFences( afences); 
   }
  //------------------------------------------------------------------------------
  var sssss= {
    markers: [{
      title: 'hello',
      coordinates: {
        latitude: 39.584239414374544,
        longitude: -104.6727005392313
      },
    },
    {
      title: 'hello',
      coordinates: {
        latitude:39.586127986532325,
        longitude: -104.67448353767395 
      },  
    }]
  };
  const [region, setRegion] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  var polylines= [[
    {longitude:          -104.67966556549071,
      latitude: 39.581580236126534
     },
     {longitude:              -104.66760635375977,
      latitude: 39.581580236126534
     },
     {longitude:              -104.66760635375977,
      latitude: 39.58917067833387
     },
     {longitude:              -104.67966556549071,
      latitude: 39.58917067833387
     },
     {longitude:              -104.67966556549071,
      latitude: 39.581580236126534
     }]]
 
  async function getTrackerData() {
    const db = firebase.firestore();
    const td = db.collection('TrackerData');

    const data = await td.get();
    var markers = [];
    var state = {};
    
    data.docs.forEach(item => {
      const fenceData = item.data();
      console.log('---------------Fence Data----------' +  JSON.stringify(fenceData) );    
      var marker = {};
      marker.title = fenceData.name;
      var coordinates = {};
      coordinates.latitude = fenceData.positions.lat;
      coordinates.longitude = fenceData.positions.lon;
      marker.coordinates = coordinates;
      markers.push(marker);
    });
    state.markers = markers;
  
    var r= {
      latitude: markerr.markers[0].coordinates.latitude,
      longitude: markerr.markers[0].coordinates.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    } 
    setMarkerr(state);   
    setRegion(r);
    console.log('---------------region----------' +  JSON.stringify(r) );    
    console.log('--------------- map ----------' +  JSON.stringify(markerr) );    
  }
  useEffect(() => {
    console.log('-------------------I am first --------'  );
    readFence();
    getTrackerData();    
  }, []);
  console.log('-------------------mapco ordinates-------outside------------' +  JSON.stringify(markerr.markers) );
  const [selectedLanguage, setSelectedLanguage] = useState();
  state = {fence: ''}
  updateFence = (fence) => {
    console.log('-------------------I am select --------'+fence  );
    var r= {
      latitude:fence[0].latitude,
      longitude: fence[0].longitude,
      latitudeDelta: 0.019,
      longitudeDelta: 0.009,
    }   
    setRegion(r);
    
  }

  return (
    
    <MapView
      style={{ flex: 1 }}
      region={region}    >
        <Picker
            selectedValue={state.fence}
            onValueChange= {updateFence}>
                {allfences && allfences.map(daata => (    
            <Picker.Item label={daata.name} value={daata.fence} key={daata.name}/>
            ))}
          </Picker>
        {allfences && allfences.map(polyline => (        
            <MapView.Polygon   coordinates={polyline.fence}    key={polyline.name}  strokeColor="rgba(0, 0, 0, 1)"     strokeWidth={3} />         
        ))}
      {markerr && markerr.markers.map(m => (
        <MapView.Marker coordinate={m.coordinates=='undefined'?0:m.coordinates} title={m.title} key={m.title}/>
      ))}
    </MapView>   
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});
export default ChatListScreen;
