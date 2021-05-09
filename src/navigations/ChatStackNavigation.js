import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddChatScreen from '../screens/AddChatScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import ChatListScreen from '../screens/ChatListScreen';
import Colors from '../helpers/ColorHelper';

const ChatStack = createStackNavigator();

const ChatNavigation = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackgroundColor,
        },
        headerTintColor: Colors.headerTextColor,
      }}
    >
      <ChatStack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          gestureEnabled: false,
          title: 'Map',
          headerShown: true,
        }}
      />
    </ChatStack.Navigator>
  );
};

export default ChatNavigation;
