import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  HandleRandomQuestion,
  HandleGetStorageItems,
  HandleSetStorageItems,
} from "@api/axios";
import uuid from "react-native-uuid";

import { StatusBar } from "expo-status-bar";

interface ICard {
  city?: string;
  id?: string | number[];
}

export default function HomeScreen() {
  const [cityName, setCityName] = useState<ICard[]>([]);

  useEffect(() => {
    async function handleStorageItems() {
      const getSavedItems = await HandleGetStorageItems();
      setCityName(getSavedItems);
    }

    handleStorageItems();
  }, []);

  useEffect(() => {
    async function getCityWeather() {
      const weather = await HandleRandomQuestion(cityName);
      console.log(cityName.length);
      if (weather === "No cities") {
        setCityName([]);
        Alert.alert("Não encontramos essa cidade, escolha outra.");
      }
    }

    getCityWeather();
  }, [cityName]);

  async function handleAddCity() {
    HandleSetStorageItems(cityName);
  }

  function handleCityInputValue(newCity: string) {
    for (let i = 0; i < cityName.length; i++) {
      if (newCity === cityName[i].city) {
        return;
      }
    }
    console.log(newCity);

    setCityName([...cityName, { city: newCity, id: uuid.v4() }]);
  }

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            height: 200,
            marginBottom: 50,
            padding: 10,
            backgroundColor: "grey",
          }}
        >
          <GooglePlacesAutocomplete
            filterReverseGeocodingByTypes={[
              "administrative_area_level_3",
              "food",
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
        </View>

        {cityName.map((item: any) => (
          <TouchableOpacity key={item.id}>
            <View style={{ backgroundColor: "white", marginVertical: 5 }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 25,
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}
              >
                {item.city}
              </Text>

              <Text
                style={{ fontSize: 18, marginBottom: 10, marginHorizontal: 10 }}
              >
                Brasil
              </Text>
              <TouchableOpacity onPress={handleAddCity}>
                <Text
                  style={{
                    color: "blue",
                    fontSize: 20,
                    marginBottom: 10,
                    marginHorizontal: 10,
                  }}
                >
                  Adicionar
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {cityName.length > 0 ? (
          <View />
        ) : (
          <View style={{ flex: 1, marginTop: 30, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Parece que você ainda não {"\n"}adicionou uma cidade.
            </Text>
            <Text>Tente adicionar uma cidade usando o botão de busca.</Text>
          </View>
        )}
      </View>

      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
});
