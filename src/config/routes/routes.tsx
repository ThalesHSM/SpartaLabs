import React from "react";
import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "@src/screens/HomeScreen/HomeScreen";
import DetailsScreen from "@src/screens/DetailsScreen/DetailsScreen";

const routes = createStackNavigator();

export default function Routes() {
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
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
