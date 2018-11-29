import React, { Component } from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { Visualizer, Button } from './toolbox'

const ContentContainer = styled.div`
   position: fixed;
   top: 3.5em;
   bottom: 0;
   left: 0;
   right: 0;
`;

const Row = styled.div`
   display: flex;
`;

const Section = styled.div`
   margin: 1em;
   flex: 1;
`;

class Flash extends Component {
   render() {
      return(
         <div>
            <Header /> 
            <ContentContainer>
               <Row>
                  <Section>
                     <Visualizer 
                        actionButtons={[<Button theme="primary" label="Choose" />]}
                     />
                  </Section>
                  <Section>
                     <h3>Hello</h3>
                  </Section>
               </Row>
            </ContentContainer>
         </div>
      );
   }
}

export default Flash;