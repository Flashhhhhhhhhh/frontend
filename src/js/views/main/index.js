import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import request from 'superagent';
import { pushView } from '../actions';
import Dropzone from 'react-dropzone';
import Welcome from './welcome';
import Files from './files';
import UploadButton from './upload_button';
import data from '../classifier/data.json';
import * as ApiActions from '../../api/actions';
import { Button } from '../../toolbox';

const apiUrl = 'http://ec2-54-86-77-144.compute-1.amazonaws.com:5004/upload';

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
      console.log(file);
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
         error: false,
         uploading: true,
      });
      setTimeout(() => {
         this.setState({
            showLoader: true,
         });
         const { fileStack } = this.state;
         const req = request.post(apiUrl);
         fileStack.forEach(file => {
            req.attach('data_file', file);
         });

         req.then(response => {
            this.viewData(response.body);
            this.setState({
               uploading: false,
               showLoader: false,
            });
         }).catch(error => {
            this.setState({ error });
         });
      }, 1000);
   };

   componentDidMount() {
      // Use this to view data without uploading anything (debugging)
      //this.viewData(data);
   }

   render() {
      const { fileStack, uploading, showLoader, error } = this.state;
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
                  <MainContainer>
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
