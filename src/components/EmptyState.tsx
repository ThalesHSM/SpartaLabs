import React from "react";
import {
  StyledMessageText,
  StyledmessageView,
  StyledSecondMmessageText,
} from "@src/screens/HomeScreen/StyledHome";

export default function EmptyState() {
  return (
    <StyledmessageView>
      <StyledMessageText>Parece que você ainda não</StyledMessageText>
      <StyledMessageText style={{ marginBottom: 10 }}>
        adicionou uma cidade.
      </StyledMessageText>
      <StyledSecondMmessageText>
        Tente adicionar uma cidade usando o campo
      </StyledSecondMmessageText>
      <StyledSecondMmessageText>de busca.</StyledSecondMmessageText>
    </StyledmessageView>
  );
}
