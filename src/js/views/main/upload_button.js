import React from 'react';
import { array, bool, func } from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../toolbox';

const Container = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 32px;
`;

const UploadButton = ({ fileStack, onClick, uploading }) => {
   return fileStack.length > 0 && (
      <Container>
         <Button design="primary" disabled={uploading} onClick={onClick}>
            {uploading ? 'Uploading...' : 'Upload & View'}
         </Button>
      </Container>
   );
};

UploadButton.propTypes = {
   uploading: bool,
   onClick: func,
   fileStack: array,
};

export default UploadButton;
