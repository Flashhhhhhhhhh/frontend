import React from 'react';
import styled from 'styled-components';
import LoadingIndicator from 'react-loading-indicator';

const Container = styled.div`
   transition: all 0.15s ease;
   opacity: ${props => (props.hidden ? 0 : 1)};
   user-select: none;
   display: flex;
   padding: 8px 0;
   justify-content: ${props => props.alignment || 'flex-start'};
   animation: fadeIn 0.3s;

   @keyframes fadeIn {
      0% {
         opacity: 0;
         transform: scale(0.85);
      }
   }
`;

const Spinner = ({ size, alignment }) => {
   const len = size === 'small' ? 4 : 8;
   const width = size === 'small' ? 2 : 3;

   return (
      <Container alignment={alignment}>
         <LoadingIndicator segmentLength={len} segmentWidth={width} />
      </Container>
   );
};

Spinner.defaultProps = {
   size: 8,
   alignment: 'center',
}

export default Spinner;
