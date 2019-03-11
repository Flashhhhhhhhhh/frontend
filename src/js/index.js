import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./components/header";
import styled, { css } from "styled-components";
import * as views from "./views";
import PopupContainer from './popups/popup_container';
import WelcomeScreen from './components/welcome';

const ViewContainer = styled.div`
   position: relative;
`;

const View = styled.div`
   position: fixed;
   top: 7em;
   left: 0;
   right: 0;
   bottom: 0;
   transition: all 0.35s ease;
   background: #e9eef4;
   overflow: auto;
   animation: slideIn 0.35s ease;

   ${props => props.curView && props.goingBack && css`
      animation: slideOut 0.35s ease;
   `}

   ${props =>
      props.index < props.numViews - 1 &&
      css`
         transform: translateX(-10%);
         filter: brightness(0.85);
      `}

   ${props => props.belowCurView && props.goingBack && css`
      transform: translateX(0);
      filter: brightness(1);
   `}

   @keyframes slideIn {
      0% {
         transform: translateX(100vw);
         box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 16px;
      }
   }

   @keyframes slideOut {
      100% {
         transform: translateX(100vw);
         box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 16px;
      }
   }
`;

class Flash extends Component {
   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const { viewStack } = viewState;
      const goingBack = viewStack.length < prevState.viewStack.length;

      return {
         viewStack: goingBack ? prevState.viewStack : viewStack,
         goingBack
      };
   }

   constructor(props) {
      super(props);
      const { viewState } = props;
      const { viewStack } = viewState;

      this.state = {
         viewStack,
         goingBack: false
      };
   }

   animateBack() {
      const { viewState } = this.props;
      const { viewStack } = viewState;

      setTimeout(() => {
         this.setState({
            viewStack,
            goingBack: false
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
         <div>
            <WelcomeScreen />
            <Header />
            <ViewContainer>
               {viewStack.map((view, index) => {
                  return (
                     <View
                        key={`view-${view.name}`}
                        numViews={viewStack.length}
                        isMain={view.name === "MainView"}
                        curView={index === viewStack.length-1}
                        belowCurView={index <= viewStack.length-2}
                        index={index}
                        goingBack={goingBack}
                     >
                        {React.createElement(views[view.name], {
                           key: view.name,
                           ...view.props
                        })}
                     </View>
                  );
               })}
            </ViewContainer>
            <PopupContainer />
         </div>
      );
   }
}

const mapStateToProps = state => ({
   viewState: state.viewState
});

const mapDispatchToProps = dispatch => ({});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Flash);
