import React, { Component } from 'react';
import styled from 'styled-components';
import { constants } from '../../toolbox';

const { animation } = constants;
const breakpointSm = `@media screen and (max-width: 700px)`;

const Container = styled.div`
   z-index: 200;
   position: fixed;
   display: ${props => (props.isOpen ? 'flex' : 'none')};
   justify-content: center;
   align-items: center;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: #e9eef4;
   animation: ${props => (props.isClosing ? animation.fadeOut : null)} 0.3s;
`;

const LogoContainer = styled.div`
   position: relative;
   display: flex;
   width: ${props => props.width};
   height: 3.5rem;
   padding-bottom: 2vh;
   overflow: hidden;
   transition: all 0.5s;
   animation: ${props =>
         props.isClosing ? animation.scaleOut : animation.scale}
      0.3s ease;

   ${breakpointSm} {
      height: 2rem;
      width: ${props => props.width === '18rem' && '10rem'};
   }
`;

const PartContainer = styled.div`
   position: relative;
   display: ${props => (props.hidden ? 'none' : 'flex')};
   align-items: flex-end;
   height: 100%;
`;

const MarkLogicLogo = styled.img`
   height: 100%;
`;

const MarkLogo = styled.img`
   width: 11rem;
   margin-left: 20px;

   ${breakpointSm} {
      width: 6rem;
      margin-left: 10px;
   }
`;

const LogicLogo = styled.img`
   position: absolute;
   width: 11rem;
   margin-left: 4px;
   top: 0;
   animation: ${animation.scale} 0.3s ease;

   ${breakpointSm} {
      width: 1.5rem;
      top: 10px;
   }
`;

export default class WelcomScreen extends Component {
   state = {
      isOpen: true,
      isClosing: false,
      width: '4rem',
      showMusic: false,
      showExtension: false,
   };

   componentDidMount() {
      setTimeout(() => {
         this.setState({
            showMusic: true,
            width: '27rem',
         });
      }, 300);
      setTimeout(() => {
         this.setState({
            showExtension: true,
         });
      }, 800);
      setTimeout(() => {
         this.setState({ isClosing: true });
      }, 1700);
      setTimeout(() => {
         this.setState({
            isClosing: false,
            isOpen: false,
         });
      }, 2000);
   }

   render() {
      const { isOpen, isClosing } = this.state;

      return (
         <Container isOpen={isOpen || isClosing} isClosing={isClosing}>
            <LogoContainer width={this.state.width} isClosing={isClosing}>
               <PartContainer>
                  <MarkLogicLogo src="images/logo_icon.svg" />
               </PartContainer>
               <PartContainer hidden={!this.state.showMusic}>
                  <MarkLogo src="images/logo_mark.svg" />
               </PartContainer>
               <PartContainer hidden={!this.state.showExtension}>
                  <LogicLogo src="images/logo_logic.svg" />
               </PartContainer>
            </LogoContainer>
         </Container>
      );
   }
}
