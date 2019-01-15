import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { pushView } from "../actions";
import { FileInput, Button, Icon } from "../../toolbox";

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: center;
`;

const WelcomeContainer = styled.div`
   display: flex;
   align-items: center;
   max-width: 28em;
   margin: 10vh 0;
`;

const Subtext = styled.h2`
   font-weight: 300;
   font-size: 42px;
   color: rgb(70, 70, 70);
   margin: 0;
`;

const Emoji = styled.h2`
   width: 60px;
   height: 60px;
   font-size: 50px;
   margin: 0 24px;
`;

const PreviewContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   height: 13em;

   button {
      margin-right: 8px;
   }

   img {
      max-height: 5em;
   }
`;

const InputContainer = styled.div`
   height: 50vh;
   width: 70vw;
   max-width: 95%;
   display: flex;
   justify-content: center;
`;

const Row = styled.div`
   display: flex;
`;

const Text = styled.h3`
   margin: 0 auto;
   color: #2c4358;
   font-size: 23px;
   font-weight: 500;
`;

const initialState = {
   curFile: null,
   loading: false
};

class MainView extends Component {
   static get metadata() {
      return {
         name: "Data Workbench",
         hideTitle: true
      };
   }

   constructor() {
      super();
      this.state = initialState;
   }

   makeRequest = ({ url, data }) => {
      return new Promise(function(resolve, reject) {
         fetch(url)
            .then(response => {
               console.log(response);
               response.json().then(data => {
                  if (response.status >= 300) {
                     reject(data.message);
                  }
                  resolve(data);
               });
            })
            .catch(e => {
               reject(Error(e));
            });
      });
   };

   handleFile = file => {
      this.setState({ loading: true });
      const url =
         "http://ec2-54-86-77-144.compute-1.amazonaws.com:5000/test/test";
      this.makeRequest({ url }).then(response => {
         setTimeout(() => {
            setTimeout(() => {
               this.setState({ loading: false, curFile: file });
            }, 300);
         }, 3000);
      });
   };

   reset = () => {
      this.setState(initialState);
   };

   viewData = () => {
      this.props.pushView({
         name: "VisualizerView",
         props: {
            dataset: {
               name: "this.state.curFile[0].name"
            }
         }
      });
   };

   componentDidMount() {
      this.viewData();
   }

   render() {
      const { loading, curFile } = this.state;

      return (
         <Container>
            <WelcomeContainer>
               <Emoji>{!curFile ? '👋' : '🎉'}</Emoji>
               <div>
                  {!!curFile ? (
                     <Subtext>Ready to View</Subtext>
                  ) : (
                     <Subtext>Welcome!</Subtext>
                  )}
                  {!!curFile ? (
                     <Text>Data successfully uploaded and parsed</Text>
                  ) : (
                     <Text>Add a dataset below to get started</Text>
                  )}
               </div>
            </WelcomeContainer>
            <InputContainer>
               {!!curFile ? (
                  <PreviewContainer>
                     <img
                        alt="icon"
                        src={`images/${curFile[0].name.split(".")[1]}_icon.svg`}
                     />
                     <Text>{curFile[0].name}</Text>
                     <Row>
                        <Button onClick={this.reset}>Restart</Button>
                        <Button design="primary" onClick={this.viewData}>
                           Visualize
                        </Button>
                     </Row>
                  </PreviewContainer>
               ) : (
                  <FileInput loading={loading} onUpload={this.handleFile} />
               )}
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
