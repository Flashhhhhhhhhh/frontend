import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../actions';
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

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
   };
};

class ClassifierView extends Component {
   static get metadata() {
      return {
         name: 'Classifier',
      };
   }

   render() {
      const { apiState } = this.props;
      const { data, refreshCount } = apiState;
      console.log(data);

      return (
         <Container>
            <TextContainer>
               <Title>{"View & Edit"}</Title>
               <Text>
                  {
                     "Here's the data we've created for you. Take some time to move, rename, or mark items as sensitive."
                  }
               </Text>
            </TextContainer>
            <Explorer key={`visualizer-${refreshCount}`} id={1} data={data} />
            <Button design="primary">Upload Finalized Data</Button>
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(ClassifierView);
