import styled, { css } from "styled-components/native";
import Colors from "@utils/colors";

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  margin-right: 30px;
`;

export const StyledSearchBar = styled.View`
  height: 120px;
  padding: 10px;
  padding-top: 20px;
  background-color: ${Colors.blue};
`;

export const StyledmessageView = styled.View`
  flex: 1px;
  margin-top: 30px;
  align-items: center;
`;

export const StyledMessageText = styled.Text`
  font-size: 20px;
  letter-spacing: 0.25px;
  font-family: "Roboto_500Medium";
`;

export const StyledSecondMmessageText = styled.Text`
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  font-size: 16px;
  letter-spacing: 0.15px;
  line-height: 24px;
  font-family: "Roboto_400Regular";
`;
