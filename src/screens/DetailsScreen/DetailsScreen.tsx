import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import uuid from "react-native-uuid";

import { format, addDays, getDaysInMonth, addMonths } from "date-fns";
import pt from "date-fns/locale/pt-BR";

import { HandleCityWeekWeather } from "@config/api/api";
import { handleTempChange } from "../../helpers/temperature";

import {
  StyledCityName,
  StyledHeaderButton,
  StyledHeaderText,
} from "./StyledDetails";

import Colors from "@utils/colors";

import { MaterialIcons } from "@expo/vector-icons";
import CityCard from "@src/components/CityCard/CityCard";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { item } = route.route.params;

  async function getWeekWeather() {
    const getCityWeather = await HandleCityWeekWeather(item.city);

    let newWeekWeather: any = [];

    let month = format(new Date(), "MMMM", { locale: pt });

    for (let i = 0; i < getCityWeather.length; i++) {
      const dateName = addDays(new Date(), i + 1);

      const dayFullName = format(dateName, "EEEE", { locale: pt });

      const nextDay = addDays(new Date(), i + 1);

      const numberDay = format(nextDay, "dd", { locale: pt });

      newWeekWeather = [
        ...newWeekWeather,
        {
          city: item.city,
          id: uuid.v4(),
          temp: Math.floor(getCityWeather[i].main.temp - 273),
          minTemp: Math.floor(getCityWeather[i].main.temp_min - 273),
          maxTemp: Math.floor(getCityWeather[i].main.temp_max - 273),
          description: getCityWeather[i].weather[0].description,
          dateName: dayFullName,
          date: numberDay + " de " + month,
        },
      ];

      const days = parseInt(numberDay);

      const DaysInMonth = getDaysInMonth(new Date());

      if (days === DaysInMonth) {
        const nextDay = addMonths(new Date(), 1);

        month = format(nextDay, "MMMM", { locale: pt });
      }
    }

    setWeekWeather(newWeekWeather);
  }

  useEffect(() => {
    async function getWeather() {
      await getWeekWeather();

      setIsLoading(false);
    }

    getWeather();
  }, []);

  function changeTemp() {
    setIsCelsius(!isCelsius);

    handleTempChange(isCelsius, weekWeather);
  }

  return (
    <>
      <View
        style={{ backgroundColor: Colors.blue, padding: 10, paddingTop: 50 }}
      >
        <StyledHeaderButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color={Colors.white}
          />
          <StyledCityName>{item.city}</StyledCityName>
        </StyledHeaderButton>
        <StyledHeaderText>Previsão para os próximos dias</StyledHeaderText>
      </View>

      {weekWeather && weekWeather.length > 0 ? (
        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
          <TouchableOpacity onPress={changeTemp}>
            <Text style={{ fontSize: 24 }}>{isCelsius ? "°C" : "°F"}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <FlatList
          data={weekWeather}
          renderItem={({ item }) => {
            return <CityCard item={item} />;
          }}
        />
      )}
    </>
  );
}
