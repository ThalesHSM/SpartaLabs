import styled from "styled-components/native";
import Colors from "@utils/colors";

import { AntDesign } from "@expo/vector-icons";

export const StyledCardView = styled.View`
  background-color: ${Colors.white};
  width: 328px;
  height: 150px;
  flex-direction: row;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${Colors.grey};
`;

export const StyledFirstText = styled.Text`
  margin-top: 12px;
  font-size: 24px;
  text-transform: capitalize;
  font-family: "Roboto_400Regular";
`;

export const StyledSecondTextName = styled.Text`
  font-size: 14px;
  line-height: 14px;
  margin-left: 1px;
  margin-top: 5px;
  letter-spacing: 0.25px;

  font-family: "Roboto_400Regular";
`;

export const StyledDescription = styled.Text`
  margin-top: 25px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: ${Colors.orange};
  font-family: "Roboto_400Regular";
`;

export const StyledTempAndHeartView = styled.View`
  flex: 1;
  margin-right: 15px;
  align-items: flex-end;
  justify-content: space-between;
`;

export const StyledTempText = styled.Text`
  color: ${Colors.orange};
  font-size: 36px;
  letter-spacing: 0.25px;
  margin-top: 24px;
  font-family: "Roboto_400Regular";
`;

export const StyledTempView = styled.View`
  align-items: flex-start;
  flex-direction: column;
`;

export const StyledMinMaxTemp = styled.Text`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

export const HeartIcon = styled(AntDesign)`
  padding: 10px;
  margin-bottom: 10px;

  color: ${Colors.red};
`;
