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
      return;
    }
  }
}

async function HandleSetStorageItems(item: any) {
  const stringifiedArray = JSON.stringify(item);

  try {
    await AsyncStorage.setItem("@storage_Key", stringifiedArray);
  } catch (err: any) {
    console.log(err);
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

export { HandleRandomQuestion, HandleSetStorageItems, HandleGetStorageItems };
