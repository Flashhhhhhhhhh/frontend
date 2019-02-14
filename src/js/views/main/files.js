import React from "react";
import styled, { css } from "styled-components";
import { Spinner, Icon, constants } from "../../toolbox";
const { color } = constants;

// Main container.
const Container = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   align-content: flex-start;
   flex-wrap: wrap;
`;

const File = styled.div`
   position: relative;
   margin: 8px 16px;
   height: 8.5em;
   animation: slideFromBottom 0.25s;
   transition: all 0.5s ease;

   &:nth-of-type(2n) {
      transition: all 0.7s ease;
   }

   .dismiss-button {
      z-index: 1;
      opacity: 0;
      transition: all 0.15s ease;
   }

   img {
      max-height: 6em;
      transition: all 0.15s ease;
   }

   h3 {
      margin: 4px 0 8px 0;
      text-align: center;
      font-weight: 400;
      color: ${color.gray[7]};
   }

   ${props =>
      props.uploading &&
      css`
         transform: translateY(-100%);
         opacity: 0;
      `}

   :hover {
      .dismiss-button {
         opacity: 1;
      }

      img {
         opacity: 0;
         transform: scale(0);
      }
   }

   @keyframes slideFromBottom {
      0% {
         transform: translateY(100%);
         opacity: 0;
      }
   }
`;

const DismissButton = styled.div`
   position: absolute;
   display: flex;
   justify-content: center;
   align-items: center;
   top: 0;
   bottom: 2.5em;
   left: 0;
   right: 0;
   margin: auto;
   max-height: 3em;
   max-width: 3em;
   background: white;
   border-radius: 50%;
   padding: 4px;
   box-shadow: 0 0 10px;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
   cursor: pointer;
`;

const LoaderContainer = styled.div`
   position: absolute;
   display: ${props => (props.isOpen ? "flex" : "none")};
   align-items: center;
   justify-content: center;
   margin: auto;
   top: 0;
   bottom: 0;
`;

const Files = ({ fileStack, uploading, showLoader, onDelete }) => {
   return (
      <Container>
         {fileStack.map((file, index) => (
            <File key={`file.name-${index}`} uploading={uploading}>
               <DismissButton
                  className="dismiss-button"
                  onClick={() => onDelete(index)}
               >
                  <Icon name="x" size={30} color={color.gray[6]} />
               </DismissButton>
               <img
                  alt="icon"
                  src={`images/${file.name.split(".")[1]}_icon.svg`}
               />
               <h3>{file.name}</h3>
            </File>
         ))}
         <LoaderContainer isOpen={showLoader}>
            <Spinner />
         </LoaderContainer>
      </Container>
   );
};

export default Files;
