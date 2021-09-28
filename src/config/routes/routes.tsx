import React, { useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";

import AppLoading from "expo-app-loading";

import * as Font from "expo-font";

import HomeScreen from "@src/screens/HomeScreen/HomeScreen";
import DetailsScreen from "@src/screens/DetailsScreen/DetailsScreen";

import Colors from "@src/utils/colors";

const routes = createStackNavigator();

export default function Routes() {
  const [IsReady, SetIsReady] = useState(false);

  async function useFonts() {
    await Font.loadAsync({
      Roboto_400Regular: Roboto_400Regular,
      Roboto_500Medium: Roboto_500Medium,
    });
  }

  const FontLoading = async () => {
    await useFonts();
    SetIsReady(true);
  };

  if (IsReady === false) {
    console.log(FontLoading);
    return (
      <AppLoading
        startAsync={FontLoading}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

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
  },
});
