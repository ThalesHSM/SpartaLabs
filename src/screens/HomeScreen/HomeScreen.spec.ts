import { handleTempChange } from "../../helpers/temperature";

describe("Created city", () => {
  it("should be able to change fahrenheit to celsius", async () => {
    const cityName = [
      {
        city: "Lorena",
        temp: 86,
        maxTemp: 95,
        minTemp: 80.6,
      },
    ];

    const changedTemp = handleTempChange(false, cityName);
    expect(changedTemp[0].temp).toBe(30);
  });

  it("should be able to change celsius to fahrenheit", async () => {
    const cityName = [
      {
        city: "Lorena",
        temp: 30,
        maxTemp: 35,
        minTemp: 27,
      },
    ];

    const changedTemp = handleTempChange(true, cityName);
    expect(changedTemp[0].temp).toBe(86);
  });
});
