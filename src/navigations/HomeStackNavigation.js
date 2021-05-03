import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HospitalizationScreen from '../screens/HospitalizationScreen';
import RecommendationScreen from '../screens/RecommendationScreen';
import VitalScreen from '../screens/VitalScreen';
import LabScreen from '../screens/LabScreen';
import InsuranceScreen from '../screens/InsuranceScreen';
import MedicineScreen from '../screens/MedicineScreen';
import DataScreen from '../screens/DataScreen';
import PerformanceScreen from '../screens/PerformanceScreen';
import TeleMedicineScreen from '../screens/TeleMedicineScreen';
import NewsScreen from '../screens/NewsScreen';
import DiseaseNavigation from './DiseaseStackNavigation';
import Colors from '../helpers/ColorHelper';
import DoctorScreen from '../screens/DoctorScreen';
import Logo from '../components/Logo';

const HomeStack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackgroundColor,
        },
        headerTintColor: Colors.headerTextColor,
        headerRight: () => <Logo />,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <HomeStack.Screen
        name="Recommendation"
        component={RecommendationScreen}
        options={{ title: 'My Recommendations' }}
      />
      <HomeStack.Screen
        name="Vital"
        component={VitalScreen}
        options={{ title: 'My Vitals' }}
      />
      <HomeStack.Screen
        name="Hospitalization"
        component={HospitalizationScreen}
        options={{ title: 'My Hospitalizations' }}
      />

      <HomeStack.Screen
        name="ChronicCondition"
        component={DiseaseNavigation}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Doctor"
        component={DoctorScreen}
        options={{ title: 'My Doctors' }}
      />
      <HomeStack.Screen
        name="Lab"
        component={LabScreen}
        options={{ title: 'My Lab' }}
      />
      <HomeStack.Screen
        name="Insurance"
        component={InsuranceScreen}
        options={{ title: 'My Insurance' }}
      />
      <HomeStack.Screen
        name="Medicine"
        component={MedicineScreen}
        options={{ title: 'My Medicines' }}
      />
      <HomeStack.Screen
        name="Data"
        component={DataScreen}
        options={{ title: 'My Data' }}
      />
      <HomeStack.Screen
        name="Performance"
        component={PerformanceScreen}
        options={{ title: 'My Performances' }}
      />
      <HomeStack.Screen
        name="TeleMedicine"
        component={TeleMedicineScreen}
        options={{ title: 'My Tele Medicines' }}
      />
      <HomeStack.Screen
        name="News"
        component={NewsScreen}
        options={{ title: 'My News' }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
