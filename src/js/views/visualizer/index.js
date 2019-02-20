import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { pushView } from "../actions";
import { Explorer } from "../../toolbox";

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: center;
   padding-top: 1em;
`;

const Title = styled.div`
   font-size: 24px;
   color: rgb(100, 100, 100);
   font-weight: 900;
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view))
   };
};

class VisualizerView extends Component {
   static get metadata() {
      return {
         name: "Classifier"
      };
   }

   render() {
      const { apiState } = this.props;
      const { data, refreshCount } = apiState;

      return (
         <Container>
            <Title>Dataset</Title>
            <Explorer
               key={`visualizer-${refreshCount}`}
               id={1}
               data={data}
            />
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(VisualizerView);
