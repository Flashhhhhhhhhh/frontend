import React, { Component } from "react";
import styled from "styled-components";
import Explorer from "./explorer";
import Search from "./search";
import { Button } from "../../";
import constants from "../../constants";

const { color } = constants;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 70vh;
   width: 70vw;
   background: white;
   margin: 1em auto;
   padding: 0 16px 16px 16px;
   border-radius: 8px;
   overflow: hidden;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.1) 0px 4px 16px;
`;

const ActionButtonContainer = styled.div`
   display: flex;
   justify-content: flex-end;
   padding: 16px 16px 0 16px;
   border-top: 1px solid ${color.gray[3]};
`;

class ExplorerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         path: []
      };
   }

   updatePath = path => {
      const { id } = this.props;
      this.setState({ path });

      const el = document.getElementById(`explorer-${id}`);
      setTimeout(() => {
         el.scroll({
            top: 0,
            left: el.scrollWidth,
            behavior: "smooth"
         });
      }, 100);
   };

   componentDidMount() {
      
   }

   render() {
      const { id } = this.props;

      return (
         <Container>
            <Search />
            <Explorer
               id={`explorer-${id}`}
               data={this.props.data}
               path={this.state.path}
               onChange={this.updatePath}
            />
            <ActionButtonContainer />
         </Container>
      );
   }
}

export default ExplorerComponent;
