import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   padding: 12px;
   box-sizing: border-box;
`;

const Pupper = styled.div`
   box-sizing: border-box;

   img {
      max-width: 100%;
      border-radius: 4px;
   }
`;

const Title = styled.h3`
   font-weight: bold;
`;

const Text = styled.h3`
   width: 80%;
   margin: 0;
   font-weight: 300;
`;

class Preview extends Component {
   render() {
      const { data } = this.props;

      return (
         <Container>
            <Pupper>
               <img alt="pupper" src="images/pupper.jpg" />
            </Pupper>
            <Title>Good Boye</Title>
            {data.map(
               item =>
                  item && <Text key={item.value}>{item && item.value}</Text>,
            )}
         </Container>
      );
   }
}

export default Preview;
