import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { Icon } from "../../";

const { color } = constants;

const Container = styled.div`
   display: flex;
   justify-content: ${props => props.center && "center"};
   justify-content: ${props => props.hasIcon && "space-between"};
   min-height: 54px;
   border-bottom: 1px solid ${color.gray[3]};
   padding: 0 16px;
   cursor: pointer;
   &:active {
      background: ${color.gray[2]};
   }
`;

const TextContainer = styled.div`
   display: flex;
   align-items: center;
`;

const IconContainer = styled.div`
   display: flex;
   align-items: center;
`;

const Label = styled.h2`
   margin: 0;
   font-size: 1rem;
   color: ${color.blue[4]};
   font-weight: ${props => (props.bold ? "bold" : "normal")};
`;

const OptionsButton = ({ label, icon, center, bold, onClick }) => {
   return (
      <Container hasIcon={icon} center={center} onClick={onClick}>
         <TextContainer>
            <Label bold={bold}>{label}</Label>
         </TextContainer>
         {icon && (
            <IconContainer>
               <Icon name={icon} color={color.blue[4]} />
            </IconContainer>
         )}
      </Container>
   );
};

export default OptionsButton;
