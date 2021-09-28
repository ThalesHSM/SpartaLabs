import styled from "styled-components/native";
import Colors from "@utils/colors";

interface ICard {
  children: any;
}

export const StyledCard = styled.View<ICard>`
  flex: 1;
  background-color: ${Colors.grey};
  padding: 16px;
`;

export const StyledCardView = styled.View`
  background-color: white;
  margin-left: 15px;
  width: 330px;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
`;

export const StyledTempView = styled.View`
  margin-left: 10px;
  align-items: center;
  flex-direction: row;
`;

export const StyledFirstText = styled.Text`
  font-weight: 600;
  font-size: 25px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

export const StyledSecondTextName = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const StyledDescription = styled.Text`
  margin-left: 10px;
  font-size: 16px;
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
`;

export const StyledMinMaxTemp = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
