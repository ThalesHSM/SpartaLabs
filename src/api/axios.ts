import axios from "axios";
import { Alert } from "react-native";

async function HandleRandomQuestion(cityName: any) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=41663f4074ad8cb97dad4981753828b2`
    );
    return response.data;
  } catch (err: any) {
    if (err.response.status === 400) {
      return;
    } else {
      return "No cities";
    }
  }
}

export { HandleRandomQuestion };
