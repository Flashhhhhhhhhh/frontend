import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
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
   max-width: 80%;
   font-weight: 300;
`;

class Preview extends Component {
   render() {
      return (
         <Container>
            <Pupper>
               <img alt="pupper" src="images/pupper.jpg" />
            </Pupper>
            <Title>Good Boye</Title>
            <Text>
               Meet the rarest pupper. He's an example of what we all should
               strive to be.
            </Text>
         </Container>
      );
   }
}

export default Preview;
