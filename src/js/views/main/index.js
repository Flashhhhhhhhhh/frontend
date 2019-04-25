import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import request from 'superagent';
import { pushView } from '../actions';
import Dropzone from 'react-dropzone';
import Welcome from './welcome';
import Files from './files';
import UploadButton from './upload_button';
import * as ApiActions from '../../api/actions';
import { Button } from '../../toolbox';

const searchParams = new URLSearchParams(window.location.search);
const port = searchParams.has("dev") ? 5006 : 5000;

const apiUrl = `http://ec2-52-87-177-238.compute-1.amazonaws.com:${port}/upload`;

const Container = styled.div`
   display: flex;
   height: 100%;
   flex-direction: column;
   align-items: center;
`;

const MainContainer = styled.div`
   position: absolute;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   margin: auto;
   max-width: 50em;
   max-height: 80em;
   transition: opacity 0.3s;
   opacity: ${props => props.isHidden && 0};
`;

const ErrorContainer = styled.div`
   max-width: 30em;
   max-height: 30em;
   margin: auto;
   animation: fadeIn 0.5s;

   h3 {
      font-size: 2rem;
      margin: 0;
   }

   h5 {
      font-size: 1.3rem;
      font-weight: 300;
      margin: 24px 0 24px 0;
   }
`;

const LowerContainer = styled.div`
   height: ${props => (props.isOpen ? '60%' : 0)};
   width: 95%;
   max-width: 33em;
   transition: all 0.3s ease;
`;

const dropzoneStyle = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   flex: 1,
   width: '100%',
};

const activeStyle = {
   background: 'rgba(0, 255, 0, 0.14)',
   transition: 'all 0.15s ease',
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      updateData: data => dispatch(ApiActions.updateData(data)),
   };
};

class MainView extends Component {
   state = {
      fileStack: [],
      uploading: false,
      showLoader: false,
      error: false,
   };

   static get metadata() {
      return {
         name: 'Data Workbench',
         hideTitle: true,
      };
   }

   viewData = dataset => {
      this.props.updateData(dataset);
      this.props.pushView({
         name: 'ClassifierView',
         props: {},
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

   validateFiles(files) {
      return files.filter(file => file.type === 'text/csv').length > 0;
   }

   sendFiles = () => {
      const { fileStack } = this.state;
      if (!this.validateFiles(fileStack)) {
         alert("There's no CSV added!");
         return;
      }

      this.setState({
         error: false,
         uploading: true,
         showLoader: true,
      });


      setTimeout(() => {
         const req = request.post(apiUrl);
         fileStack.forEach(file => {
            if (file.type === 'application/json') {
               req.attach('data_ontology', file);
            } else {
               req.attach('data_file', file);
            }
         });

         req.then(response => {
            this.setState({
               done: true,
            });
            setTimeout(() => {
               this.viewData(response.body);
               setTimeout(() => {
                  this.setState({
                     done: false,
                     uploading: false,
                     showLoader: false,
                  });
               }, 300);
            }, 300);
         }).catch(error => {
            this.setState({ error });
         });
      }, 1000);
   };

   componentDidMount() {
      // Use this to view data without uploading anything (debugging)
      // this.viewData(data);
   }

   render() {
      const { fileStack, uploading, showLoader, error, done } = this.state;
      const hasFiles = fileStack.length > 0;

      return (
         <Container>
            <Dropzone
               onDrop={this.handleDrop}
               activeStyle={activeStyle}
               multiple={true}
               style={dropzoneStyle}
               disableClick={hasFiles}>
               {error ? (
                  <ErrorContainer>
                     <h3>{'Unexpected Error'}</h3>
                     <h5>{error.message}</h5>
                     <Button
                        design="primary"
                        onClick={() => window.location.reload()}>
                        Reload Page
                     </Button>
                  </ErrorContainer>
               ) : (
                  <MainContainer isHidden={done}>
                     <Welcome
                        isReady={hasFiles}
                        uploading={uploading}
                        done={done}
                     />
                     <LowerContainer isOpen={hasFiles}>
                        <Files
                           fileStack={fileStack}
                           uploading={uploading}
                           done={done}
                           showLoader={showLoader}
                           onDelete={this.deleteFile}
                        />
                        <UploadButton
                           fileStack={fileStack}
                           uploading={uploading}
                           onClick={this.sendFiles}
                        />
                     </LowerContainer>
                  </MainContainer>
               )}
            </Dropzone>
         </Container>
      );
   }
}

export default connect(
   null,
   mapDispatchToProps,
)(MainView);
