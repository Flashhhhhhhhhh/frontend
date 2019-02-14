import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { pushView } from "../actions";
import Dropzone from "react-dropzone";
import Welcome from "./welcome";
import Files from "./files";
import UploadButton from "./upload_button";

const apiUrl = "http://ec2-54-86-77-144.compute-1.amazonaws.com:5000/test/test";

const Container = styled.div`
   display: flex;
   height: 100%;
   flex-direction: column;
   align-items: center;
`;

const LowerContainer = styled.div`
   height: ${props => (props.isOpen ? "60%" : 0)};
   width: 95%;
   max-width: 33em;
   transition: all 0.3s ease;
`;

const dropzoneStyle = {
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   flex: 1,
   width: "100%"
};

const activeStyle = {
   background: "rgba(0, 255, 0, 0.14)",
   transition: "all 0.15s ease"
};
class MainView extends Component {
   state = {
      fileStack: [],
      uploading: false,
      showLoader: false
   };

   static get metadata() {
      return {
         name: "Data Workbench",
         hideTitle: true
      };
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

   handleDrop = file => {
      this.setState(state => {
         state.fileStack.push(file[0]);
         return state;
      });
   };

   deleteFile = index => {
      this.setState(state => {
         state.fileStack.splice(index, 1);
         return state;
      });
   };

   sendFiles = () => {
      this.setState({
         uploading: true
      });
      setTimeout(() => {
         this.setState({
            showLoader: true
         });
         this.makeRequest({ apiUrl }).then(response => {
            setTimeout(() => {
               this.viewData();
               this.setState({
                  uploading: false,
                  showLoader: false
               });
            }, 3000);
         });
      }, 500);
   };

   render() {
      const { fileStack, uploading, showLoader } = this.state;
      const hasFiles = fileStack.length > 0;

      return (
         <Container>
            <Dropzone
               onDrop={this.handleDrop}
               activeStyle={activeStyle}
               multiple={true}
               style={dropzoneStyle}
               disableClick
            >
               <Welcome isReady={hasFiles} uploading={uploading} />
               <LowerContainer isOpen={hasFiles}>
                  <Files
                     fileStack={fileStack}
                     uploading={uploading}
                     showLoader={showLoader}
                     onDelete={this.deleteFile}
                  />
                  <UploadButton
                     fileStack={fileStack}
                     uploading={uploading}
                     onClick={this.sendFiles}
                  />
               </LowerContainer>
            </Dropzone>
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
