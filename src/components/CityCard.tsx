import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  HandleRemoveStorageItem,
  HandleSetStorageItems,
} from "@config/api/api";

import {
  StyledCardView,
  StyledFirstText,
  StyledSecondTextName,
  StyledDescription,
  StyledTempAndHeartView,
  StyledTempText,
  StyledTempView,
  StyledMinMaxTemp,
  HeartIcon,
} from "@src/components/StyledCardItems";

import {
  StyledMessageText,
  StyledmessageView,
  StyledSecondMmessageText,
} from "@src/screens/HomeScreen/StyledHome";

import Colors from "@src/utils/colors";

interface ITemp {
  cityName: any;
  setIsSaved?: any;
}

export default function CityCard({ setIsSaved, cityName }: ITemp) {
  const navigation = useNavigation();

  function handleRemoveCity(item: any) {
    HandleRemoveStorageItem(item);
  }

  function handleAddCity(item: any) {
    HandleSetStorageItems(item);
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
    <View>
      {setIsSaved ? (
        <View>
          {cityName ? (
            cityName.length > 0 ? (
              cityName.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    navigation.navigate("Details", { item });
                  }}
                >
                  <StyledCardView>
                    <View style={{ marginLeft: 5 }}>
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
                        {item.saved === true ? (
                          <HeartIcon
                            name="heart"
                            size={30}
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 10,
                            }}
                          />
                        ) : (
                          <HeartIcon
                            name="hearto"
                            size={30}
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 10,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    </StyledTempAndHeartView>
                  </StyledCardView>
                </TouchableOpacity>
              ))
            ) : (
              <StyledmessageView>
                <StyledMessageText>Parece que você ainda não</StyledMessageText>
                <StyledMessageText style={{ marginBottom: 10 }}>
                  adicionou uma cidade.
                </StyledMessageText>
                <StyledSecondMmessageText>
                  Tente adicionar uma cidade usando o campo
                </StyledSecondMmessageText>
                <StyledSecondMmessageText>de busca.</StyledSecondMmessageText>
              </StyledmessageView>
            )
          ) : null}
        </View>
      ) : (
        <View
          style={{
            width: "100%",
          }}
        >
          {cityName ? (
            cityName.length > 0 ? (
              cityName.map((item: any) => (
                <StyledCardView key={item.id}>
                  <View style={{ marginHorizontal: 5 }}>
                    <StyledFirstText>{item.dateName}</StyledFirstText>
                    <StyledSecondTextName>{item.date}</StyledSecondTextName>

                    <StyledDescription>{item.description}</StyledDescription>
                    <StyledTempView>
                      <StyledMinMaxTemp>{item.minTemp}°</StyledMinMaxTemp>
                      <StyledMinMaxTemp>- {item.maxTemp}°</StyledMinMaxTemp>
                    </StyledTempView>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    <StyledTempText>{item.temp}°</StyledTempText>
                  </View>
                </StyledCardView>
              ))
            ) : (
              <ActivityIndicator
                size="large"
                color={Colors.black}
                style={{
                  marginTop: 10,
                  marginLeft: 20,
                  alignSelf: "center",
                }}
              />
            )
          ) : null}
        </View>
      )}
    </View>
  );
}
