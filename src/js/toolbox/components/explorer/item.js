import React from "react";
import styled, { css } from "styled-components";
import constants from "../../constants";

const { color } = constants;

const Container = styled.div`
   .options-button {
      display: none;
   }

   .lock-icon {
      margin-left: 4px;
   }

   :hover {
      .options-button {
         display: block;
      }
   }
`;

const Button = styled.button`
   width: 100%;
   height: 40px;
   display: flex;
   align-items: center;
   padding: 0 12px 0 8px;
   font-family: inherit;
   font-size: 14px;
   text-align: left;
   border: 0;
   border-bottom: 1px solid ${color.gray[2]};
   box-sizing: border-box;
   outline: 0;
   background: white;
   -webkit-appearance: none;
   cursor: pointer;

   ${props =>
      props.isSelected &&
      css`
         color: white;
         background: ${color.blue[4]};
      `}

   :active {
      filter: brightness(0.95);
   }
`;

function Item({ style, ...props }) {
   return (
      <Container>
         <Button {...props} />
      </Container>
   );
}

export default Item;
