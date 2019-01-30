import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Icon } from "../..";
import constants from "../../constants";
import * as Actions from "../../../popups/actions";

const { color } = constants;

const Container = styled.div`
   width: 240px;
   height: 100%;
   flex: 0 0 auto;
   border-right: 1px solid ${color.gray[4]};
   overflow-y: auto;
`;

const PlusButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 40px;
   padding: 0 4px 0 8px;
   font-size: 14px;
   cursor: pointer;

   :active {
      background: ${color.gray[1]};
   }
`;

const mapDispatchToProps = dispatch => ({
   pushPopup: popup => dispatch(Actions.pushPopup(popup))
});

class Column extends Component {
   addDirectory = () => {
      this.props.pushPopup({
         name: "DirAdder",
         props: {}
      });
   };

   render() {
      const { showPlus } = this.props;

      return (
         <Container>
            {this.props.children}
            {showPlus && (
               <PlusButton onClick={this.addDirectory}>
                  <Icon name="plus" size={24} color={color.gray[5]} />
               </PlusButton>
            )}
         </Container>
      );
   }
}

export default connect(
   null,
   mapDispatchToProps
)(Column);
