import styled from "styled-components/native";
import Colors from "@src/utils/colors";

export const StyledScrollView = styled.ScrollView``;

export const StyledHeaderButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 50%;
`;

export const StyledCityName = styled.Text`
  font-size: 20px;
  letter-spacing: 0.25px;
  margin-bottom: 2px;
  color: ${Colors.white};
  font-family: "Roboto_500Medium";
`;

export const StyledHeaderText = styled.Text`
  align-self: center;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: ${Colors.white};

  font-family: "Roboto_400Regular";
`;
