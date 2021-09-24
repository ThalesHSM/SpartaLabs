import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { HandleRandomQuestion } from "@api/axios";

export default function HomeScreen() {
  const [CityName, setCityName] = useState<string>();

  useEffect(() => {
    async function a() {
      const weather = await HandleRandomQuestion(CityName);

      console.log(weather.name);
    }
    a();
  }, [CityName]);

  function handleAddCity() {}

  return (
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
            setCityName(data.structured_formatting.main_text)
          }
          onFail={(error) => console.error(error)}
        />
      </View>
      {CityName ? (
        <View style={{ backgroundColor: "white" }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 25,
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          >
            {CityName}
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
      ) : (
        <View style={{ flex: 1, marginTop: 30, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Parece que você ainda não {"\n"}adicionou uma cidade.
          </Text>
          <Text>Tente adicionar uma cidade usando o botão de busca.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
});
