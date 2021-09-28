import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BASE_URL from "@utils/constants";

async function handleCityWeatherQuestion(cityName: any) {
  try {
    const response = await axios.get(
      `${BASE_URL}weather?q=${cityName}&APPID=41663f4074ad8cb97dad4981753828b2`
    );
    return response.data;
  } catch (err: any) {
    if (err.response.status >= 400) {
      return "No cities";
    }
  }
}

async function HandleCityWeekWeather(cityName: any) {
  const response = await axios.get(
    `${BASE_URL}forecast?q=${cityName}&APPID=41663f4074ad8cb97dad4981753828b2`
  );
  const fiveDays = response.data.list.slice(0, 5);
  return fiveDays;
}

async function HandleSetStorageItems(city: any) {
  let newArray = [];

  const citiesJSON = await AsyncStorage.getItem("@storage_Key");

  await AsyncStorage.clear();
}

async function HandleRemoveStorageItem(singleCity: any) {
  try {
    const citiesJSON = await AsyncStorage.getItem("@storage_Key");

    if (citiesJSON !== null) {
      let storageArray = JSON.parse(citiesJSON);
      const alteredUsers = storageArray.filter(function (e: any) {
        return e.id !== singleCity.id;
      });

      AsyncStorage.setItem("@storage_Key", JSON.stringify(alteredUsers));
    }
  } catch (error) {
    console.log(error);
  }
}

async function HandleGetStorageItems() {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      const restoredArray = JSON.parse(value);
      return restoredArray;
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  handleCityWeatherQuestion,
  HandleSetStorageItems,
  HandleGetStorageItems,
  HandleRemoveStorageItem,
  HandleCityWeekWeather,
};
