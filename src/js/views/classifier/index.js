import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import * as Actions from '../actions';
import { Explorer, Spinner, Button } from '../../toolbox';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: center;
   padding-top: 1em;
`;

const TextContainer = styled.div`
   margin: 0 auto;
   width: 80%;
   max-width: 70em;
   transition: all 0.3s;
   opacity: ${props => (props.isHidden ? 0 : 1)};
`;

const Title = styled.h3`
   font-size: 24px;
   color: rgb(100, 100, 100);
   margin: 6px 0;
   font-weight: 900;
`;

const Text = styled.h3`
   font-weight: 300;
   margin: 0;
`;

const ExplorerContainer = styled.div`
   margin: 1em;
   height: 60vh;
   min-height: 34em;
   width: 80%;
   max-width: 70em;
   transition: all 0.3s ease;

   ${props =>
      props.scalingDown &&
      css`
         transform: scale(0.4);
      `}

   ${props =>
      props.slidingUp &&
      css`
         transform: scale(0.4) translateY(-100%);
         opacity: 0;
      `}
`;

const LoadingContainer = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   margin: auto;
   height: 4em;
   width: 4em;
`;

const ButtonContainer = styled.div``;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(Actions.pushView(view)),
   };
};

class ClassifierView extends Component {
   static get metadata() {
      return {
         name: 'Classifier',
      };
   }

   state = {
      scalingDown: false,
      slidingUp: false,
   };

   uploadData = () => {
      this.setState({ scalingDown: true });
      setTimeout(() => {
         this.setState({ slidingUp: true });
         setTimeout(() => {
            this.setState({ uploading: true });
            setTimeout(() => {
               this.props.pushView({
                  name: 'VisualizerView',
                  props: {
                     data: this.props.data,
                  },
               });
               setTimeout(() => {
                  this.setState({
                     uploading: false,
                     scalingDown: false,
                     slidingUp: false,
                  });
               }, 300);
            }, 500);
         }, 300);
      }, 500);
   };

   render() {
      const { apiState } = this.props;
      const { data, refreshCount } = apiState;
      const { slidingUp, uploading } = this.state;

      return (
         <Container>
            <TextContainer isHidden={slidingUp || uploading}>
               <Title>{'View & Edit'}</Title>
               <Text>
                  {
                     "Here's the data we've created for you. Take some time to move, rename, or mark items as sensitive."
                  }
               </Text>
            </TextContainer>
            <ExplorerContainer {...this.state}>
               <Explorer
                  key={`visualizer-${refreshCount}`}
                  id={1}
                  data={data}
               />
            </ExplorerContainer>
            {uploading && (
               <LoadingContainer>
                  <Spinner />
               </LoadingContainer>
            )}
            <ButtonContainer>
               <Button
                  disabled={uploading}
                  onClick={this.uploadData}
                  design="primary">
                  {uploading ? 'Uploading...' : 'Upload Finalized Data'}
               </Button>
            </ButtonContainer>
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(ClassifierView);
