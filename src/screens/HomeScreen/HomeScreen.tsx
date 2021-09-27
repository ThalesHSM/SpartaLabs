import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { handleCityWeatherQuestion, HandleGetStorageItems } from "@src/api/api";
import uuid from "react-native-uuid";

import { useNavigation } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

import { StyledScrollView, StyledSearchBar } from "./StyledHome";

import CityCard from "@src/components/CityCard";

interface ICard {
  city: string;
  id: string | number[];
  temp: number;
  maxTemp: number;
  minTemp: number;
  description: string;
  saved: boolean;
}

export default function HomeScreen() {
  const [cityName, setCityName] = useState<ICard[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  useEffect(() => {
    async function handleStorageItems() {
      const getSavedItems = await HandleGetStorageItems();
      setCityName(getSavedItems);
    }

    handleStorageItems();
  }, []);

  async function handleCityInputValue(newCity: string) {
    if (cityName) {
      for (let i = 0; i < cityName.length; i++) {
        if (newCity === cityName[i].city) {
          return;
        }
      }
    }
    const weather = await handleCityWeatherQuestion(newCity);

    if (weather === "No cities") {
      Alert.alert("Não encontramos essa cidade! ", "Procure outra!", [
        { text: "OK" },
      ]);
      return;
    }

    if (cityName && cityName.length > 0 && isCelsius === true) {
      setCityName([
        ...cityName,
        {
          city: newCity,
          id: uuid.v4(),
          temp: Math.floor(weather.main.temp - 273),
          minTemp: Math.floor(weather.main.temp_min - 273),
          maxTemp: Math.floor(weather.main.temp_max - 273),
          description: weather.weather[0].description,
          saved: false,
        },
      ]);
      return;
    }

    if (cityName && cityName.length > 0 && isCelsius === false) {
      setCityName([
        ...cityName,
        {
          city: newCity,
          id: uuid.v4(),
          temp: Math.floor(((weather.main.temp - 273) * 9) / 5 + 32),
          minTemp: Math.floor(((weather.main.temp_min - 273) * 9) / 5 + 32),
          maxTemp: Math.floor(((weather.main.temp_max - 273) * 9) / 5 + 32),
          description: weather.weather[0].description,
          saved: false,
        },
      ]);
      return;
    }

    if (isCelsius === true) {
      setCityName([
        {
          city: newCity,
          id: uuid.v4(),
          temp: Math.floor(weather.main.temp - 273),
          minTemp: Math.floor(weather.main.temp_min - 273),
          maxTemp: Math.floor(weather.main.temp_max - 273),
          description: weather.weather[0].description,
          saved: false,
        },
      ]);
    }

    if (isCelsius === false) {
      setCityName([
        {
          city: newCity,
          id: uuid.v4(),
          temp: Math.floor(((weather.main.temp - 273) * 9) / 5 + 32),
          minTemp: Math.floor(((weather.main.temp_min - 273) * 9) / 5 + 32),
          maxTemp: Math.floor(((weather.main.temp_max - 273) * 9) / 5 + 32),
          description: weather.weather[0].description,
          saved: false,
        },
      ]);
    }
  }
  function handleTempChange() {
    setIsCelsius(!isCelsius);

    if (isCelsius === true) {
      for (let i = 0; i < cityName.length; i++) {
        cityName[i].temp = Math.round((cityName[i].temp * 9) / 5 + 32);
        cityName[i].maxTemp = Math.round((cityName[i].maxTemp * 9) / 5 + 32);
        cityName[i].minTemp = Math.round((cityName[i].minTemp * 9) / 5 + 32);
      }
    }

    if (isCelsius === false) {
      for (let i = 0; i < cityName.length; i++) {
        cityName[i].temp = Math.round(((cityName[i].temp - 32) * 5) / 9);
        cityName[i].maxTemp = Math.round(((cityName[i].maxTemp - 32) * 5) / 9);
        cityName[i].minTemp = Math.round(((cityName[i].minTemp - 32) * 5) / 9);
      }
    }
  }
  return (
    <>
      <StyledScrollView keyboardShouldPersistTaps="always">
        <StyledSearchBar>
          <GooglePlacesAutocomplete
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3",
            ]}
            placeholder="Search"
            query={{
              key: "AIzaSyAcS7vJeEUD10lLbaq2O-1tIOXAu2n0M-w",
              language: "pt-br", // language of the results
              components: "country:br",
            }}
            onPress={(data, details = null) =>
              handleCityInputValue(data.structured_formatting.main_text)
            }
            onFail={(error) => console.error(error)}
          />
        </StyledSearchBar>

        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
          <TouchableOpacity onPress={handleTempChange}>
            {isCelsius === true ? (
              <Text style={{ fontSize: 24 }}>°C</Text>
            ) : (
              <Text style={{ fontSize: 24 }}>°F</Text>
            )}
          </TouchableOpacity>
        </View>

        <CityCard setIsSaved={setIsSaved} cityName={cityName} />
      </StyledScrollView>
      <StatusBar style="light" />
    </>
  );
}
