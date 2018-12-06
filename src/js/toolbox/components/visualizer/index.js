import React, { Component } from "react";
import styled from "styled-components";
import Search from "./components/search";
import ItemPane from "./components/item_pane";
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

const ItemPaneContainer = styled.div`
   flex: 1;
   display: flex;
   overflow-x: auto;
`;

const ActionButtonContainer = styled.div`
   display: flex;
   justify-content: flex-end;
   padding: 16px 16px 0 16px;
   border-top: 1px solid ${color.gray[3]};
`;

class Visualizer extends Component {
   render() {
      return (
         <Container>
            <Search />
            <ItemPaneContainer>
               <ItemPane>
                  <Button
                     theme="list"
                     selected
                     locked
                     label="California"
                     chevron
                     onLockToggle={() => alert("Toggled lock")}
                  />
                  <Button theme="list" unlocked label="Colorado" chevron />
                  <Button theme="list" label="Washington" chevron />
               </ItemPane>
               <ItemPane>
                  <Button theme="list" locked label="Sacramento" chevron />
                  <Button
                     theme="list"
                     unlocked
                     label="Santa Barbara"
                     chevron
                  />
               </ItemPane>
               <ItemPane />
               {this.props.itemPanes}
            </ItemPaneContainer>
            <ActionButtonContainer>
               {this.props.actionButtons}
            </ActionButtonContainer>
         </Container>
      );
   }
}

Visualizer.defaultProps = {
   itemPanes: [],
   actionButtons: [],
   onSearchChange: () => {}
};

export { default as ItemPane } from "./components/item_pane";
export default Visualizer;
