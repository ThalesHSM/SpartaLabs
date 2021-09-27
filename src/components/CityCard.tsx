import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  StyledCardView,
  StyledFirstText,
  StyledSecondTextName,
  StyledDescription,
  StyledTempAndHeartView,
  StyledTempText,
  StyledTempView,
  StyledMinMaxTemp,
} from "@src/components/StyledCardItems";
import { HandleRemoveStorageItem, HandleSetStorageItems } from "@src/api/api";
import {
  HeartIcon,
  StyledmessageText,
  StyledmessageView,
} from "@src/screens/HomeScreen/StyledHome";
import Colors from "@src/utils/colors";

interface ITemp {
  cityName: any;
  setIsSaved: any;
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
    <View style={{ alignItems: "flex-end", marginRight: 20 }}>
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
        )
      ) : null}
    </View>
  );
}