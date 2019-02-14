import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Explorer, constants } from "../../toolbox";
import * as Actions from "../../popups/actions";

const { color, animation } = constants;
const { scaleInBounce, scaleOutBounce } = animation;

const Container = styled.div`
   z-index: ${props => 100 + props.index};
   position: fixed;
   display: flex;
   justify-content: center;
   align-items: center;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

const Cover = styled.div`
   z-index: 0;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   cursor: pointer;
   background: ${color.grayAlpha[5]};
   animation: ${props => (props.closing ? animation.fadeOut : animation.fadeIn)}
      0.3s ease-in-out;
`;

const Modal = styled.div`
   position: relative;
   height: 40em;
   width: 30em;
   max-width: 100%;
   max-height: 100%;
   background: white;
   padding: 24px;
   border-radius: 14px;
   animation: ${props => (props.closing ? scaleOutBounce : scaleInBounce)} 0.3s
      cubic-bezier(0.68, -0.55, 0.265, 1.55);
   overflow: hidden;
`;

const Header = styled.div`
   display: flex;
   align-items: center;
`;

const Title = styled.h2`
   margin: 0;
   font-weight: 900;
   font-size: 34px;
`;

const Subtitle = styled.h2`
   font-weight: 400;
   margin: 0;
   font-size: 24px;
   color: ${color.gray[8]};
`;

const Emoji = styled.h2`
   font-size: 50px;
   margin: 14px 24px 0 0;
`;

const mapDispatchToProps = dispatch => {
   return {
      popPopup: () => dispatch(Actions.popPopup())
   };
};

class ItemMover extends Component {
   handleClick = onClick => {
      this.props.popPopup();
      setTimeout(() => {
         typeof onClick === "function" && onClick();
      }, 250);
   };

   render() {
      const { index, closing } = this.props;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.handleClick} />
            <Modal closing={closing}>
               <Header>
                  <Emoji>🗄</Emoji>
                  <div>
                     <Title>Move items</Title>
                     <Subtitle>We'll need a bit more from you first</Subtitle>
                  </div>
               </Header>
               <Explorer
                  id={2}
                  data={this.props.data}
                  height="80%"
                  width="auto"
               />
            </Modal>
         </Container>
      );
   }
}

export default connect(
   null,
   mapDispatchToProps
)(ItemMover);
