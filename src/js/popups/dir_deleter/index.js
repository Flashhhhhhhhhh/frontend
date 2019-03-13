import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, constants } from '../../toolbox';
import * as PopupActions from '../../popups/actions';

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
   height: 9em;
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

const ButtonContainer = styled.div`
   display: flex;
   margin: 15px 15px 0;
   justify-content: flex-end;

   > button {
      margin-left: 15px;

      :last-child {
         background-color: red;
      }
   }
`;

const mapStateToProps = state => ({
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => {
   return {
      popPopup: () => dispatch(PopupActions.popPopup()),
   };
};

class DirDeleter extends Component {
   deleteCategory = () => {
      this.props.popPopup();
   };

   render() {
      const { index, closing } = this.props;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.props.popPopup} />
            <Modal closing={closing}>
               <Header>
                  <Emoji>
                     <span role="img" aria-label="trash">🗑</span>
                  </Emoji>
                  <div>
                     <Title>Delete "Thing"</Title>
                     <Subtitle>Are you sure?</Subtitle>
                  </div>
               </Header>
               <ButtonContainer>
                  <Button
                     design="secondary"
                     onClick={this.props.popPopup}>
                     Cancel
                  </Button>
                  <Button
                     design="primary"
                     onClick={this.deleteCategory}>
                     Delete
                  </Button>
               </ButtonContainer>
            </Modal>
         </Container>
      );
   }
}
export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(DirDeleter);
