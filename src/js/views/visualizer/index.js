import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { pushView } from "../actions";
import { Visualizer as Viewer } from "../../toolbox";

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: center;
   padding-top: 3.5em;
`;

const Title = styled.div`
   font-size: 24px;
   color: rgb(100, 100, 100);
   font-weight: 900;
`;

class VisualizerView extends Component {
   static get metadata() {
      return {
         name: "Visualizer"
      };
   }

   render() {
      console.log(this.props);
      return (
         <Container>
            <Title>{this.props.dataset.name}</Title>
            <Viewer />
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      viewState: state.viewState
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view))
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(VisualizerView);
