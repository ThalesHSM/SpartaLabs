import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  handleCityWeatherQuestion,
  HandleGetStorageItems,
} from "@config/api/api";
import uuid from "react-native-uuid";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { StyledSearchBar } from "./StyledHome";

import { handleTempChange } from "../../helpers/temperature";

import Colors from "@utils/colors";
import CityCard from "@src/components/CityCard/CityCard";
import EmptyState from "@src/components/EmptyState";

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
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClear, setIsclear] = useState<boolean>(true);

  const ref: any = useRef();

  useEffect(() => {
    async function handleStorageItems() {
      const getSavedItems = await HandleGetStorageItems();
      setCityName(getSavedItems);
    }

    handleStorageItems();
  }, []);

  async function handleCityInputValue(newCity: string) {
    if (cityName && cityName.length) {
      for (let i = 0; i < cityName.length; i++) {
        if (newCity === cityName[i].city) {
          return;
        }
      }
    }
    setIsLoading(true);

    const weather = await handleCityWeatherQuestion(newCity);

    setIsLoading(false);

    if (weather === "No cities") {
      return Alert.alert("Não encontramos essa cidade! ", "Procure outra!", [
        { text: "OK" },
      ]);
    }
    if (cityName && cityName.length > 0 && isCelsius === true) {
      return setCityName([
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
    }

    if (cityName && cityName.length > 0 && isCelsius === false) {
      return setCityName([
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
    }

    if (isCelsius) {
      return setCityName([
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

    return setCityName([
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

  function changeTemp() {
    setIsCelsius(!isCelsius);

    handleTempChange(isCelsius, cityName);
  }

  function clearTextInput() {
    if (
      ref.current?.getAddressText() ||
      ref.current?.isFocused() === false ||
      (ref.current?.getAddressText() && ref.current?.isFocused())
    ) {
      ref.current?.setAddressText("");
      ref.current?.blur("");
      setIsclear(!isClear);
    }
  }

  function focusTextInput() {
    ref.current?.focus();
    setIsclear(!isClear);
  }

  return (
    <>
      <StyledSearchBar>
        <GooglePlacesAutocomplete
          ref={ref}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3",
          ]}
          placeholder="Cidades"
          query={{
            key: "AIzaSyAcS7vJeEUD10lLbaq2O-1tIOXAu2n0M-w",
            language: "pt-br",
            components: "country:br",
          }}
          onPress={(data, details = null) =>
            handleCityInputValue(data.structured_formatting.main_text)
          }
          onFail={(error) => console.error(error)}
          textInputProps={{ placeholderTextColor: Colors.white }}
          styles={{
            textInput: {
              backgroundColor: Colors.blue,
              color: Colors.white,
              fontSize: 20,
              fontFamily: "Roboto_400Regular",
            },

            description: {
              color: Colors.white,
              fontSize: 20,
              fontFamily: "Roboto_400Regular",
            },
            row: { backgroundColor: Colors.blue },
            poweredContainer: { backgroundColor: Colors.blue },
          }}
        />
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          {isClear ? (
            <TouchableOpacity onPress={focusTextInput}>
              <AntDesign
                name="search1"
                size={25}
                color={Colors.white}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={clearTextInput}>
              <MaterialIcons
                name="clear"
                size={25}
                color={Colors.white}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </StyledSearchBar>

      {cityName && cityName.length > 0 ? (
        <View
          style={{
            alignItems: "flex-end",
            marginRight: 20,
            marginVertical: 20,
          }}
        >
          <TouchableOpacity onPress={changeTemp}>
            <Text style={{ fontSize: 24, fontFamily: "Roboto_400Regular" }}>
              {isCelsius ? "°C" : "°F"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : cityName && cityName.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={cityName}
          renderItem={({ item }) => {
            return <CityCard item={item} shouldShowSaveButton />;
          }}
        />
      )}
    </>
  );
}
