import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import uuid from "react-native-uuid";

import { format, addDays, getDaysInMonth, addMonths } from "date-fns";
import pt from "date-fns/locale/pt-BR";

import { HandleCityWeekWeather } from "@src/api/api";
import Temperature from "@src/components/Temperature";

import {
  StyledCityName,
  StyledHeaderButton,
  StyledHeaderText,
  StyledScrollView,
} from "./StyledDetails";

import {
  StyledCardView,
  StyledFirstText,
  StyledSecondTextName,
  StyledDescription,
  StyledTempText,
  StyledTempView,
  StyledMinMaxTemp,
} from "@src/components/StyledCardItems";

import Colors from "@utils/colors";

import { MaterialIcons } from "@expo/vector-icons";

interface ICard {
  city: string;
  id: string | number[];
  temp: number;
  maxTemp: number;
  minTemp: number;
  description: string;
  dateName: string;
  date: string;
}

export default function DetailsScreen(route: any) {
  const navigation = useNavigation();

  const [weekWeather, setWeekWeather] = useState<ICard[]>([]);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const { item } = route.route.params;

  async function getWeekWeather() {
    const getCityWeather = await HandleCityWeekWeather(item.city);

    let newWeekWeather: any = [];

    let month = format(new Date(), "MMMM", { locale: pt });

    for (let i = 0; i < getCityWeather.length; i++) {
      const dayName = addDays(new Date(), i + 1);

      const dateName = format(dayName, "EEEE", { locale: pt });

      const nextDay = addDays(new Date(), i + 1);
      const day = format(nextDay, "dd", { locale: pt });

      const days = parseInt(day);

      const DaysInMonth = getDaysInMonth(new Date());

      newWeekWeather = [
        ...newWeekWeather,
        {
          city: item.city,
          id: uuid.v4(),
          temp: Math.floor(getCityWeather[i].main.temp - 273),
          minTemp: Math.floor(getCityWeather[i].main.temp_min - 273),
          maxTemp: Math.floor(getCityWeather[i].main.temp_max - 273),
          description: getCityWeather[i].weather[0].description,
          dateName: dateName,
          date: day + " de " + month,
        },
      ];

      if (days === DaysInMonth) {
        const nextDay = addMonths(new Date(), 1);

        month = format(nextDay, "MMMM", { locale: pt });
      }
    }

    setWeekWeather(newWeekWeather);
  }

  useEffect(() => {
    async function a() {
      await getWeekWeather();
    }

    a();
  }, []);

  function handleTempChange() {
    setIsCelsius(!isCelsius);

    if (isCelsius === true) {
      for (let i = 0; i < weekWeather.length; i++) {
        weekWeather[i].temp = Math.round((weekWeather[i].temp * 9) / 5 + 32);
        weekWeather[i].maxTemp = Math.round(
          (weekWeather[i].maxTemp * 9) / 5 + 32
        );
        weekWeather[i].minTemp = Math.round(
          (weekWeather[i].minTemp * 9) / 5 + 32
        );
      }
    }

    if (isCelsius === false) {
      for (let i = 0; i < weekWeather.length; i++) {
        weekWeather[i].temp = Math.round(((weekWeather[i].temp - 32) * 5) / 9);
        weekWeather[i].maxTemp = Math.round(
          ((weekWeather[i].maxTemp - 32) * 5) / 9
        );
        weekWeather[i].minTemp = Math.round(
          ((weekWeather[i].minTemp - 32) * 5) / 9
        );
      }
    }
  }

  return (
    <>
      <StyledScrollView>
        <View>
          <StyledHeaderButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
              color={Colors.black}
            />
            <StyledCityName>{item.city}</StyledCityName>
          </StyledHeaderButton>
          <StyledHeaderText>Previsão para os próximos dias</StyledHeaderText>
        </View>

        {weekWeather.length ? (
          <View style={{ alignItems: "flex-end", marginRight: 20 }}>
            <TouchableOpacity onPress={handleTempChange}>
              {isCelsius === true ? (
                <Text style={{ fontSize: 24 }}>°C</Text>
              ) : (
                <Text style={{ fontSize: 24 }}>°F</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}

        {weekWeather ? (
          weekWeather.length > 0 ? (
            weekWeather.map((item: any) => (
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
              color={Colors.grey}
              style={{ marginTop: 10 }}
            />
          )
        ) : null}
      </StyledScrollView>
      <StatusBar style="light" />
    </>
  );
}
