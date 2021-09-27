import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  handleCityWeatherQuestion,
  HandleGetStorageItems,
  HandleSetStorageItems,
  HandleRemoveStorageItem,
} from "@src/api/api";
import uuid from "react-native-uuid";
// import { useTranslation } from "react-i18next";

import { useNavigation } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

import {
  HeartIcon,
  StyledmessageText,
  StyledmessageView,
  StyledScrollView,
  StyledSearchBar,
} from "./StyledHome";
import {
  StyledCardView,
  StyledFirstText,
  StyledSecondTextName,
  StyledDescription,
  StyledTempAndHeartView,
  StyledTempText,
  StyledTempView,
  StyledMinMaxTemp,
} from "@components/StyledCard";
import Colors from "@utils/colors";

interface ICard {
  city?: string;
  id?: string | number[];
  temp?: number;
  maxTemp?: number;
  minTemp?: number;
  description?: string;
  saved?: boolean;
}

export default function HomeScreen() {
  // const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const [cityName, setCityName] = useState<ICard[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    async function handleStorageItems() {
      const getSavedItems = await HandleGetStorageItems();
      setCityName(getSavedItems);
    }

    handleStorageItems();
  }, []);

  function handleAddCity(item: any) {
    HandleSetStorageItems(item);
  }

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

    if (cityName && cityName.length > 0) {
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

  function handleRemoveCity(item: any) {
    HandleRemoveStorageItem(item);
  }

  function handleSavedItem(item: any) {
    if (item.saved === false) {
      item.saved = true;
      setIsSaved(true);
      handleAddCity(item);
      return;
    }
    if (item.saved === true) {
      item.saved = false;
      setIsSaved(false);

      handleRemoveCity(item);

      return;
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

        {cityName.length > 0 ? (
          cityName.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate("Details", { item });
              }}
            >
              <StyledCardView>
                <View style={{ marginHorizontal: 5 }}>
                  <StyledFirstText>{item.city}</StyledFirstText>

                  <StyledSecondTextName>Brasil</StyledSecondTextName>
                  <StyledDescription>{item.description}</StyledDescription>

                  <StyledTempView>
                    <StyledMinMaxTemp>{item.minTemp}°</StyledMinMaxTemp>
                    <StyledMinMaxTemp> - {item.maxTemp}°</StyledMinMaxTemp>
                  </StyledTempView>
                </View>

                <StyledTempAndHeartView>
                  <StyledTempText>{item.temp}°</StyledTempText>
                  <TouchableOpacity
                    onPress={() => {
                      handleSavedItem(item);
                    }}
                  >
                    <HeartIcon
                      name="heart"
                      size={30}
                      color={Colors.black}
                      style={{ paddingHorizontal: 10, paddingVertical: 10 }}
                      colored={item.saved}
                    />
                  </TouchableOpacity>
                </StyledTempAndHeartView>
              </StyledCardView>
            </TouchableOpacity>
          ))
        ) : (
          <StyledmessageView>
            <StyledmessageText>Parece que você ainda não</StyledmessageText>
            <StyledmessageText>adicionou uma cidade.</StyledmessageText>
            <Text style={{ marginTop: 5 }}>
              Tente adicionar uma cidade usando o campo de busca.
            </Text>
          </StyledmessageView>
        )}
      </StyledScrollView>
      <StatusBar style="light" />
    </>
  );
}
