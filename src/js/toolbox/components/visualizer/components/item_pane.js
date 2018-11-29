import React, { Component } from 'react';
import styled from 'styled-components';
import constants from '../../../constants';
const { color } = constants;

const Container = styled.div`
   flex: 1;
   max-width: 15em;
   min-width: 15em;
   border-right: 1px solid ${color.gray[3]};
`;

class ItemPane extends Component {
   render() {
      return (
         <Container>
            {this.props.children}
         </Container>
      );
   }
}

export default ItemPane;