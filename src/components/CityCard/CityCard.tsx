import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { _ } from "lodash";

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
} from "./StyledCardItems";

interface ITemp {
  item: any;
  shouldShowSaveButton?: boolean;
}

export default function NewCityCard({ item, shouldShowSaveButton }: ITemp) {
  const navigation = useNavigation();
  const [isItemSaved, setIsItemSaved] = useState<boolean>(item.saved);

  function handleSavedItem(item: any) {
    setIsItemSaved(!isItemSaved);

    const newItem = _.cloneDeep(item);
    newItem.saved = !isItemSaved;

    if (newItem.saved) {
      return HandleSetStorageItems(newItem);
    }
    return HandleRemoveStorageItem(newItem);
  }

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        navigation.navigate("Details", { item });
      }}
    >
      <StyledCardView
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}
      >
        <View style={{ marginLeft: 15 }}>
          {shouldShowSaveButton ? (
            <>
              <StyledFirstText>{item.city}</StyledFirstText>
              <StyledSecondTextName>Brasil</StyledSecondTextName>
            </>
          ) : (
            <>
              <StyledFirstText>{item.dateName}</StyledFirstText>
              <StyledSecondTextName>{item.date}</StyledSecondTextName>
            </>
          )}

          <StyledTempView>
            <StyledDescription>{item.description}</StyledDescription>
            <View style={{ flexDirection: "row" }}>
              <StyledMinMaxTemp>{item.minTemp}°</StyledMinMaxTemp>
              <StyledMinMaxTemp> - {item.maxTemp}°</StyledMinMaxTemp>
            </View>
          </StyledTempView>
        </View>

        <StyledTempAndHeartView>
          <StyledTempText>{item.temp}°</StyledTempText>

          {shouldShowSaveButton ? (
            <TouchableOpacity
              onPress={() => {
                handleSavedItem(item);
              }}
            >
              {isItemSaved ? (
                <HeartIcon name="heart" size={24} />
              ) : (
                <HeartIcon name="hearto" size={24} />
              )}
            </TouchableOpacity>
          ) : null}
        </StyledTempAndHeartView>
      </StyledCardView>
    </TouchableOpacity>
  );
}
