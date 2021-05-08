import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReminderScreen from '../screens/ReminderScreen';
import HomeNavigation from './HomeStackNavigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AccountNavigation from './AccountStackNavigation';
import ChatNavigation from './ChatStackNavigation';
import Colors from '../helpers/ColorHelper';

const LandingTab = createBottomTabNavigator();

const LandingNavigation = () => {
  return (
    <LandingTab.Navigator
      initialRouteName="Reminder"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: Colors.tabActiveColor,
        inactiveTintColor: Colors.tabTextColor,
        style: {
          backgroundColor: Colors.tabBackgroundColor,
          paddingBottom: 5,
          elevation: 10,
          height: 60,
        },
        labelStyle: {
          fontSize: 14,
        },
      }}
    >
      <LandingTab.Screen
        name="Tracker"
        component={ReminderScreen}
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-marker-multiple"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <LandingTab.Screen
        name="Map"
        component={ChatNavigation}
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <Ionicons name="map" size={30} color={color} />
          ),
        }}
      />
    </LandingTab.Navigator>
  );
};

export default LandingNavigation;
