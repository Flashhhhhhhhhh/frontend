import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as ViewActions from '../actions';
import * as PopupActions from '../../popups/actions';
import { Explorer, Button } from '../../toolbox';

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
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(ViewActions.pushView(view)),
      pushPopup: popup => dispatch(PopupActions.pushPopup(popup)),
   };
};

class VisualizerView extends Component {
   static get metadata() {
      return {
         name: 'Visualizer',
      };
   }

   downloadJson = () => {
      const { apiState } = this.props;
      const { data } = apiState;

      this.props.pushPopup({
         name: 'DownloadManager',
         props: { data },
      });
   };

   render() {
      const { apiState } = this.props;
      const { data, refreshCount } = apiState;

      return (
         <Container>
            <TextContainer>
               <Title>{'Explore'}</Title>
               <Text>{"Here's your finalized data!"}</Text>
            </TextContainer>
            <ExplorerContainer>
               <Explorer
                  key={`visualizer-${refreshCount}`}
                  id={1}
                  data={data}
                  actionButtons={
                     <Button design="primary" onClick={this.downloadJson}>
                        {'Export...'}
                     </Button>
                  }
               />
            </ExplorerContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisualizerView);
