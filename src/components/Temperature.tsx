import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ITemp {
  changeTemp: any;
}

export default function Temperature({ changeTemp }: ITemp) {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  function handleTempChange() {
    setIsCelsius(!isCelsius);

    if (isCelsius === true) {
      for (let i = 0; i < changeTemp.length; i++) {
        changeTemp[i].temp = Math.round((changeTemp[i].temp * 9) / 5 + 32);
        changeTemp[i].maxTemp = Math.round(
          (changeTemp[i].maxTemp * 9) / 5 + 32
        );
        changeTemp[i].minTemp = Math.round(
          (changeTemp[i].minTemp * 9) / 5 + 32
        );
        console.log(changeTemp[0].temp);
      }
    }

    if (isCelsius === false) {
      for (let i = 0; i < changeTemp.length; i++) {
        changeTemp[i].temp = Math.round(((changeTemp[i].temp - 32) * 5) / 9);
        changeTemp[i].maxTemp = Math.round(
          ((changeTemp[i].maxTemp - 32) * 5) / 9
        );
        changeTemp[i].minTemp = Math.round(
          ((changeTemp[i].minTemp - 32) * 5) / 9
        );
      }
    }
  }

  return (
    <View style={{ alignItems: "flex-end", marginRight: 20 }}>
      <TouchableOpacity onPress={handleTempChange}>
        {isCelsius === true ? (
          <Text style={{ fontSize: 24 }}>°C</Text>
        ) : (
          <Text style={{ fontSize: 24 }}>°F</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
