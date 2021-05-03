import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiseaseScreen from '../screens/DiseaseScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import Colors from '../helpers/ColorHelper';
import Logo from '../components/Logo';

const DiseaseStack = createStackNavigator();

const DiseaseNavigation = () => {
  return (
    <DiseaseStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackgroundColor,
        },
        headerTintColor: Colors.headerTextColor,
        headerRight: () => <Logo />,
      }}
    >
      <DiseaseStack.Screen
        name="Diease"
        component={DiseaseScreen}
        options={{ title: 'Chronic Conditions' }}
      />
      <DiseaseStack.Screen
        name="Questionnaire"
        component={QuestionnaireScreen}
      />
    </DiseaseStack.Navigator>
  );
};

export default DiseaseNavigation;
