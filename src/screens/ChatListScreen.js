import React, { useEffect, useState } from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { firebase } from '../helpers/Firebaseconfig';
import CustomPicker from '../components/CustomPicker';

const ChatListScreen = () => {
  const [markerr, setMarkerr] = React.useState({
    markers: [
      {
        title: 'Test',
        coordinates: {
          latitude: 39.584239414374544,
          longitude: -104.6727005392313,
        },
      },
    ],
  });
  const [fence, setFence] = React.useState('');
  const [allFences, setAllFences] = React.useState([
    { name: '', fence: [{ latitude: 0, longitude: 0 }] },
  ]);
  const [region, setRegion] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  async function readFence() {
    let afences = [];
    const db = firebase.firestore();
    const findme = db.collection('Findme');
    const data = await findme.get();
    data.docs.forEach(item => {
      var d = JSON.parse(item.data().fenceA);
      afences.push({ name: item.data().name, fence: d.fence });
    });
    console.log(
      '-------------all --Fence Data----------' + JSON.stringify(afences)
    );

    var r = {
      latitude: afences[0].fence[0].latitude,
      longitude: afences[0].fence[0].longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    };

    setRegion(r);
    setAllFences(afences);
    console.log('---------------region----------' + JSON.stringify(r));
  }
  //------------------------------------------------------------------------------

  async function getTrackerData() {
    const db = firebase.firestore();
    const td = db.collection('TrackerData');

    const data = await td.get();
    var markers = [];
    var state = {};

    data.docs.forEach(item => {
      const fenceData = item.data();
      console.log(
        '---------------Fence Data----------' + JSON.stringify(fenceData)
      );
      var marker = {};
      marker.title = fenceData.name;
      var coordinates = {};
      coordinates.latitude = fenceData.positions.lat;
      coordinates.longitude = fenceData.positions.lon;
      marker.coordinates = coordinates;
      markers.push(marker);
    });
    state.markers = markers;
    setMarkerr(state);
    console.log('--------------- map ----------' + JSON.stringify(markerr));
  }
  useEffect(() => {
    console.log('-------------------I am first --------');
    readFence();
    getTrackerData();
  }, []);
  console.log(
    '-------------------mapco ordinates-------outside------------' +
      JSON.stringify(markerr.markers)
  );

  const updateFence = fence => {
   // console.log('-------------------I am select --------' + fence);
    var r = {
      latitude: fence[0].latitude,
      longitude: fence[0].longitude,
      latitudeDelta: 0.019,
      longitudeDelta: 0.009,
    };
    getTrackerData();
    setRegion(r);
    setFence(fence);

  };
  const getFences = () => {
    return allFences?.map(item => ({
      label: item.name,
      value: item.fence,
    }));
  };
  return (
    <>
    <SafeAreaView style={styles.container}>
    <CustomPicker
        value={fence}
        setValue={updateFence}
        placeholder={{}}
        items={getFences() ?? []}
      />
</SafeAreaView>
    <MapView style={{ flex: 1 }} region={region}>
      

      {allFences &&
        allFences.map(polyline => (
          <MapView.Polygon
            coordinates={polyline.fence}
            key={polyline.name}
            strokeColor="rgba(0, 0, 0, 1)"
            strokeWidth={3}
          />
        ))}
      {markerr &&
        markerr.markers.map(m => (
          <MapView.Marker
            coordinate={m.coordinates ??{}}
            title={m.title}
            key={m.title}
          />
        ))}
    </MapView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
  },
});
export default ChatListScreen;
