import React from 'react';
import styled from 'styled-components';
import { Button } from '../../toolbox';

const Container = styled.div`
   z-index: 1;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center
   flex: 1;
   max-width: 33em;
   margin-bottom: ${props => (props.isReady ? 0 : '15%')};
   max-height: ${props => (props.isReady ? '20%' : '55%')};
   transition: all 0.3s ease;
`;

const TextContainer = styled.div`
   display: flex;
`;

const ButtonContainer = styled.div`
   margin: 64px 0;
`;

const Subtext = styled.h2`
   font-weight: 300;
   font-size: 42px;
   color: rgb(70, 70, 70);
   margin: 0;
   animation: slideUp 0.5s;
`;

const Emoji = styled.h2`
   width: 60px;
   height: 60px;
   font-size: 50px;
   margin: 0 24px;
   animation: jiggle 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);

   @keyframes jiggle {
      0% {
         transform: rotate(-30deg) scale(0.5);
         opacity: 0;
      }
   }
`;

const Text = styled.h3`
   margin: 0 auto;
   color: #2c4358;
   font-size: 23px;
   font-weight: 300;
`;

const Welcome = ({ isReady, uploading }) => {
   return (
      <Container isReady={isReady}>
         <TextContainer>
            <Emoji>{!isReady ? '👋' : uploading ? '🧐' : '🎉'}</Emoji>
            <div>
               {isReady &&
                  !uploading && (
                     <React.Fragment>
                        <Subtext>Ready to Upload</Subtext>
                        <Text>
                           {"Feel free to add more files if you'd like."}
                        </Text>
                     </React.Fragment>
                  )}
               {!isReady && (
                  <React.Fragment>
                     <Subtext>Welcome!</Subtext>
                     <Text>Drag a dataset here to get started.</Text>
                  </React.Fragment>
               )}
               {uploading && (
                  <React.Fragment>
                     <Subtext>One sec</Subtext>
                     <Text>Thinking through some algorithms</Text>
                  </React.Fragment>
               )}
            </div>
         </TextContainer>

         {!isReady &&
            !uploading && (
               <ButtonContainer>
                  <Button design="primary">Browse Files...</Button>
               </ButtonContainer>
            )}
      </Container>
   );
};
export default Welcome;
