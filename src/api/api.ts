import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BASE_URL from "@utils/constants";

async function HandleRandomQuestion(cityName: any) {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${cityName}&APPID=41663f4074ad8cb97dad4981753828b2`
    );
    return response.data;
  } catch (err: any) {
    if (err.response.status === 400) {
      return "No cities";
    }
    if (err.response.status > 400) {
      return "No cities";
    }
  }
}

async function HandleSetStorageItems(city: any) {
  try {
    const usersJSON = await AsyncStorage.getItem("@storage_Key");

    if (usersJSON !== null) {
      let storageArray = JSON.parse(usersJSON);
      let newArray = [...storageArray, city];
      const stringifiedArray = JSON.stringify(newArray);

      await AsyncStorage.setItem("@storage_Key", stringifiedArray);
    }
  } catch (error) {
    console.log(error);
  }
}

async function HandleRemoveStorageItem(singleCity: any) {
  try {
    const usersJSON = await AsyncStorage.getItem("@storage_Key");

    if (usersJSON !== null) {
      let usersArray = JSON.parse(usersJSON);
      const alteredUsers = usersArray.filter(function (e: any) {
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
  } catch (err: any) {
    console.log(err);
  }
}

export {
  HandleRandomQuestion,
  HandleSetStorageItems,
  HandleGetStorageItems,
  HandleRemoveStorageItem,
};
