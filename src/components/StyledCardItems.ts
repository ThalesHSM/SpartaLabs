import styled from "styled-components/native";
import Colors from "@utils/colors";

import { AntDesign } from "@expo/vector-icons";

export const StyledCardView = styled.View`
  background-color: ${Colors.white};
  width: 328px;
  height: 130px;
  flex-direction: row;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const StyledTempView = styled.View`
  margin-left: 10px;
  align-items: center;
  flex-direction: row;
`;

export const StyledFirstText = styled.Text`
  margin: 5px;
  font-size: 24px;
  text-transform: capitalize;
  font-family: "Roboto_400Regular";
`;

export const StyledSecondTextName = styled.Text`
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.25px;
  margin-left: 9px;
  margin-bottom: 10px;

  font-family: "Roboto_400Regular";
`;

export const StyledDescription = styled.Text`
  margin-left: 9px;
  margin-top: 16px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: ${Colors.orange};
  font-family: "Roboto_400Regular";
`;

export const StyledTempAndHeartView = styled.View`
  flex: 1;
  margin-right: 20px;
  align-items: flex-end;
  justify-content: space-between;
`;

export const StyledTempText = styled.Text`
  color: ${Colors.orange};
  font-size: 34px;
  letter-spacing: 0.25px;
  margin-right: 5px;
  font-family: "Roboto_400Regular";
`;

export const StyledMinMaxTemp = styled.Text`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
  margin-bottom: 10px;
`;

export const HeartIcon = styled(AntDesign)`
  padding: 10px;

  color: ${Colors.red};
`;
