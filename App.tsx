import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Constants from "expo-constants";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "@src/screens/HomeScreen/HomeScreen";
import DetailsScreen from "@src/screens/DetailsScreen/DetailsScreen";

const routes = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <routes.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <routes.Screen name="Home" component={HomeScreen} />
          <routes.Screen name="Details" component={DetailsScreen} />
        </routes.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
});
