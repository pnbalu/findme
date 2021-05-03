import React, { useEffect, useState } from 'react';

import MapView, { Marker } from 'react-native-maps';
import { firebase } from '../helpers/Firebaseconfig';

const ChatListScreen = () => {
  // const [state, setState] = React.useState(null);
  const [markerr, setMarkerr] = React.useState({markers: [{title: 'Test', coordinates: {
    latitude: 39.584239414374544,
    longitude: -104.6727005392313
  }}] });
  var mapState = {};
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

  async function getTrackerData() {
    const db = firebase.firestore();
    const td = db.collection('TrackerData');

    const data = await td.get();
    var markers = [];
    var state = {};
    data.docs.forEach(item => {
      const fenceData = item.data();
    
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
    setRegion(r)
    console.log('---------------region----------' +  JSON.stringify(r) );    
    console.log('--------------- map ----------' +  JSON.stringify(markerr) );    
  }
  useEffect(() => {
    console.log('-------------------I am first --------'  );
    getTrackerData();    
  }, [MapView]);
  console.log('-------------------mapco ordinates-------outside------------' +  JSON.stringify(markerr.markers) );

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={region => setRegion(region)} >
      {markerr && markerr.markers.map(m => (
        <MapView.Marker coordinate={m.coordinates} title={m.title} />
      ))}
    </MapView>
  );
};
export default ChatListScreen;
