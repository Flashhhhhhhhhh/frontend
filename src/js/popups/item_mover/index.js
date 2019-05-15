import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Explorer, constants } from '../../toolbox';
import * as Actions from '../actions';
import * as ApiActions from '../../api/actions';

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
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 40em;
   width: 60em;
   max-width: 90%;
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

const ExplorerContainer = styled.div`
   height: 80%;
   width: auto;
   margin-top:
`;

const mapDispatchToProps = dispatch => {
   return {
      popPopup: () => dispatch(Actions.popPopup()),
      updateData: data => dispatch(ApiActions.updateData(data)),
   };
};

class ItemMover extends Component {
   handleClick = onClick => {
      this.props.popPopup();
      setTimeout(() => {
         typeof onClick === 'function' && onClick();
      }, 250);
   };

   handleMove = to => {
      let { data, trailingPath, item } = this.props;

      // We need to also move everything nested under the current item.
      let nestedItems = data;
      for (let item of trailingPath) {
         nestedItems = nestedItems[item];
      }

      // 'to' is the path to the new spot in the data
      let curSpot = data;
      for (let spot of to) {
         curSpot = curSpot[spot];
      }

      // Update the "move" tag to reflect the new position.
      let tag = nestedItems[item].tag[0];
      // If this item has been moved before, preserve its original path.
      let header_old =
         tag['move'] && tag['move'].header_old
            ? tag['move'].header_old
            : trailingPath;

      tag['move'] = {
         header_old,
         header_new: to,
      };

      curSpot[item] = nestedItems[item];
      delete nestedItems[item];

      this.props.updateData(data);
      this.props.popPopup();
   };

   render() {
      const { item, index, closing } = this.props;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.handleClick} />
            <Modal closing={closing}>
               <Header>
                  <Emoji>🗄</Emoji>
                  <div>
                     <Title>Move "{item}"</Title>
                     <Subtitle>{'Select where to move it'}</Subtitle>
                  </div>
               </Header>
               <ExplorerContainer>
                  <Explorer
                     id={2}
                     data={this.props.data}
                     hideOptions
                     nonLeafOnly
                     hiddenItem={item}
                     onChange={this.handleMove}
                     showSelectButton
                  />
               </ExplorerContainer>
            </Modal>
         </Container>
      );
   }
}
export default connect(
   null,
   mapDispatchToProps,
)(ItemMover);
