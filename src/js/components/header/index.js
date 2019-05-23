import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { popView } from '../../views/actions';
import * as views from '../../views';
import UserSelect from './user_select';
import Link from './link'

const Container = styled.div`
   z-index: 1;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   padding: 0 1em;
   height: 7em;
   background: #2a4356;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
`;

const Logo = styled.img`
   margin-top: 1em;
   z-index: -1;
   transition: all 0.35s ease;

   ${props =>
      props.isHidden &&
      css`
         opacity: 0;
         transform: translateX(-100%);
      `}
`;

const BackButton = styled.div`
   position: absolute;
   display: flex;
   transition: all 0.35s ease;
   margin-top: 17px;
   color: white;
   font-size: 30px;

   h3 {
      z-index: -1;
      font-weight: 900;
   }

   ${props =>
      props.index > 0 &&
      css`
         animation: slideIn 0.35s;
      `};

   ${props =>
      ((props.isBackButton && !props.goingBack) || props.isHidden) &&
      css`
         margin-top: 0;
         font-size: 16px;
         color: white;
         cursor: pointer;
         z-index: 1;

         h3 {
            font-weight: 500;
         }

         .caret {
            margin-right: 8px;
            transition: all 0.35s ease;
         }
      `};

   ${props =>
      props.goingBack &&
      props.isTitle &&
      css`
         animation: slideOut 0.35s;
      `}

   ${props =>
      props.isBackButton &&
      props.goingBack &&
      css`
         .caret {
            margin-right: -8px;
            opacity: 0;
         }
      `}

   ${props =>
      props.isTitle &&
      css`
         .caret {
            margin-right: -8px;
            opacity: 0;
         }
      `}

   ${props =>
      props.isHidden &&
      !props.becomingBackButton &&
      css`
         margin-left: -100%;
      `};
`;

class Header extends Component {
   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const { viewStack } = viewState;
      const goingBack = viewStack.length < prevState.viewStack.length;

      return {
         viewStack: goingBack ? prevState.viewStack : viewStack,
         goingBack,
      };
   }

   constructor(props) {
      super(props);
      const { viewState } = props;
      const { viewStack } = viewState;

      this.state = {
         viewStack,
         goingBack: false,
      };
   }

   animateBack() {
      const { viewState } = this.props;
      const { viewStack } = viewState;

      setTimeout(() => {
         this.setState({
            viewStack,
            goingBack: false,
         });
      }, 300);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.goingBack) {
         this.animateBack();
      }
   }

   render() {
      const { viewStack, goingBack } = this.state;

      return (
         <Container>
            {viewStack.map((view, index) => {
               const isTitle = index === viewStack.length - 1;
               const isBackButton = index === viewStack.length - 2;
               const isHidden = index < viewStack.length - 2;

               return (
                  <BackButton
                     key={`back-to-${view.name}`}
                     numViews={viewStack.length}
                     isTitle={isTitle}
                     isBackButton={isBackButton}
                     isHidden={isHidden}
                     becomingBackButton={isHidden && goingBack}
                     index={index}
                     goingBack={goingBack}
                     onClick={
                        index === viewStack.length - 2
                           ? this.props.popView
                           : null
                     }>
                     <img alt="back" className="caret" src="images/back.svg" />
                     <h3>{views[viewStack[index].name].metadata.name}</h3>
                  </BackButton>
               );
            })}
            <Logo
               src="images/logo.svg"
               isHidden={
                  !(goingBack && viewStack.length === 2) && viewStack.length > 1
               }
            />
            <Link />
            <UserSelect />
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      popView: view => dispatch(popView(view)),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(Header);
