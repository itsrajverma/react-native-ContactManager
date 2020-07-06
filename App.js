import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import HomeScreen from "./screens/HomeScreen";
import ViewContactScreen from "./screens/ViewContactScreen";
import EditContactScreen from "./screens/EditContactScreen";
import AddContactScreen from "./screens/AddContactScreen";


const Stack = createStackNavigator();

const App = () => {
  return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={ { headerTitleAlign : 'center',headerTintColor : "#fff" , headerStyle : { backgroundColor : '#B83227' } }}>
          <Stack.Screen name="Home" component={ HomeScreen } />
          <Stack.Screen name="Add" component={ AddContactScreen } />
          <Stack.Screen name="Edit" component={ EditContactScreen } />
          <Stack.Screen name="View" component={ ViewContactScreen } />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;

