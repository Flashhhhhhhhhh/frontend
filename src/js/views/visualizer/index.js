import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { pushView } from "../actions";
import { Explorer } from "../../toolbox";
import data from './data.json'

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

class VisualizerView extends Component {
   static get metadata() {
      return {
         name: "Visualizer"
      };
   }

   render() {
      return (
         <Container>
            <Title>{this.props.dataset.name}</Title>
            <Explorer
               id={1}
               data={data}
            />
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
