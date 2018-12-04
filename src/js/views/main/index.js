import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { pushView } from "../actions";
import { FileInput } from "../../toolbox";

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: center;
`;

const WelcomeContainer = styled.div`
   margin: 10vh 0;
   text-align: center;

   h2 {
      font-weight: 900;
      font-size: 42px;
      color: rgb(70, 70, 70);
      margin: 0;
   }
`;

const InputContainer = styled.div`
   height: 50vh;
   width: 70vw;
   max-width: 95%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const Text = styled.h3`
   margin: 0 auto;
   color: #2c4358;
   font-size: 23px;
   font-weight: 300;
`;

const initialState = {
   currentFile: null,
   loading: false
};

class MainView extends Component {
   static get metadata() {
      return {
         name: "Data Workbench",
         hideTitle: true,
      };
   }

   state = initialState

   handleFile(file) {
      this.setState({ loading: true });
      setTimeout(() => {
         this.props.pushView({
            name: "VisualizerView",
            props: {
               dataset: {
                  name: "hello.csv"
               }
            }
         });
         setTimeout(() => {
            this.setState(initialState);
         }, 300);
      }, 1500);
   }

   render() {
      const { loading } = this.state;

      return (
         <Container>
            <WelcomeContainer>
               <h2>Welcome!</h2>
               <Text>Add a dataset below to get started</Text>
            </WelcomeContainer>
            <InputContainer>
               <FileInput
                  loading={loading}
                  onUpload={this.handleFile.bind(this)}
               />
            </InputContainer>
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
)(MainView);
