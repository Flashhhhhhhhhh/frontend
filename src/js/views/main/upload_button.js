import React from "react";
import styled from "styled-components";
import { Button } from "../../toolbox";

const Container = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 32px;
`;

const UploadButton = ({ fileStack, onClick, uploading }) => {
   return (
      fileStack.length > 0 && (
         <Container>
            <Button design="primary" disabled={uploading} onClick={onClick}>
               {uploading ? "Uploading..." : "Upload & View"}
            </Button>
         </Container>
      )
   );
};

export default UploadButton;
