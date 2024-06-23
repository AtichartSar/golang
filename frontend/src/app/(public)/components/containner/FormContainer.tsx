"use client";
import LayoutClient from "@/components/layouts";
import { WHITE_COLOR } from "@/config/color";
import styled from "@emotion/styled";
import React from "react";

const FormContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledContainer>
      <StyledContainerForm>{children}</StyledContainerForm>
    </StyledContainer>
  );
};

export default FormContainer;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${WHITE_COLOR};
`;

const StyledContainerForm = styled.div`
  border: 1px solid black;
  padding: 16px 16px;
  border-radius: 16px;
`;
