import React from "react";
import styled, { css } from "styled-components";
import Dropzone from "react-dropzone";
import { Spinner } from "../../";

const Container = styled.div`
   position: relative;
   display: flex;
   height: 100%;
   width: 100%;
   background: white;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
   transition: all 0.3s ease;
   cursor: pointer;
   margin: 0 auto;

   ${props => props.loading && css`
      display: flex;
      height: 10em;
      width: 10em;
      border-radius: 50%;
   `};
`;

const dropzoneStyle = {
   display: "flex",
   width: "100%",
   height: "100%"
};

const DottedOutline = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   flex: 1;
   margin: 8px;
   border: 2px dashed lightgray;
   transition: all 0.3s ease;

   ${props => props.loading && css`
      border-radius: 50%;
      animation: rotate 10s;
   `};

   ${props =>
      props.dragEntered &&
      css`
         background: blue;
      `};

   @keyframes rotate {
      from {
         transform: rotate(0deg);
      } to {
         transform: rotate(-360deg);
      }
   }
`;

const Text = styled.h3`
   margin: 0;
   font-size: 2rem;
   color: rgb(100, 100, 100);
   text-align: center;
   font-weight: 400;
`;

const activeStyle = {
   background: "rgba(0, 255, 0, 0.14)",
   transition: "all 0.15s ease"
};

const loadingStyle = {
   display: 'flex',
   height: '100%',
   width: '100%',
}

const FileInput = ({ onUpload, loading }) => {
   const hello = file => {
      onUpload(file);
   };

   return (
      <Container loading={loading}>
         <Dropzone
            onDrop={hello}
            activeStyle={activeStyle}
            multiple={false}
            style={loading ? loadingStyle : dropzoneStyle}
         >
            <DottedOutline loading={loading}>
               {loading ? (
                  <Spinner />
               ) : (
                  <div>
                     <Text>Drag and drop</Text>
                     <Text>(.csv, .json)</Text>
                  </div>
               )}
            </DottedOutline>
         </Dropzone>
      </Container>
   );
};

export default FileInput;
