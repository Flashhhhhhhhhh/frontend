import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   display: flex;
   align-items: center;
   padding: 0 1em;
   height: 3.5em;
   background: #2A4356;
`;

const Logo = styled.img`

`;

class Header extends Component {
   render() {
      return (
         <Container>
            <Logo src="images/logo.svg" />
         </Container>
      );
   }
}

export default Header;