import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "../../";

const Container = styled.div`
   display: flex;
   align-items: center;
   min-height: 50px;
   box-sizing: border-box;
`;

const Input = styled.input`
   flex: 1;
   height: 97%;
   font-size: 24px;
   border: none;
   padding-left: 8px;
   font-weight: 300;
   outline: none;
   -webkit-appearance: none;

   ::placeholder {
      color: rgba(0, 0, 0, 0.3);
   }
`;

class Search extends Component {
   state = {
      value: ""
   };

   handleChange = e => {
      this.setState(
         {
            value: e.target.value
         },
         this.props.onChange(e.target.value)
      );
   };

   render() {
      return (
         <Container>
            <Icon name="search" size={30} color="rgb(130,130,130)" />
            <Input
               type="text"
               value={this.state.value}
               onChange={this.handleChange}
               placeholder="Search"
            />
         </Container>
      );
   }
}

export default Search;
