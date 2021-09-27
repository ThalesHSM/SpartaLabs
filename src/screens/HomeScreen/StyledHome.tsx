import styled, { css } from "styled-components/native";
import Colors from "@utils/colors";

import { AntDesign } from "@expo/vector-icons";

interface IIcon {
  colored: boolean;
}

export const HeartIcon = styled(AntDesign)<IIcon>`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  ${(props) =>
    props.colored === false
      ? css`
          color: ${Colors.black};
        `
      : props.colored === true &&
        css`
          color: ${Colors.red};
        `}
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  margin-right: 30px;
`;

export const StyledSearchBar = styled.View`
  height: 200px;
  padding: 10px;
  background-color: grey;
`;

export const StyledmessageView = styled.View`
  flex: 1px;
  margin-top: 30px;
  align-items: center;
`;

export const StyledmessageText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;
