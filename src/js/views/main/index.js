import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import request from 'superagent';
import { pushView } from '../actions';
import Dropzone from 'react-dropzone';
import Welcome from './welcome';
import Files from './files';
import UploadButton from './upload_button';
import data from '../visualizer/data.json';
import * as ApiActions from '../../api/actions';

const apiUrl = 'http://ec2-54-86-77-144.compute-1.amazonaws.com:5001/upload';

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
   };

   static get metadata() {
      return {
         name: 'Data Workbench',
         hideTitle: true,
      };
   }

   makeRequest = ({ url, data }) => {
      return new Promise(function(resolve, reject) {
         fetch(url, data)
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

   viewData = dataset => {
      this.props.updateData(dataset);
      this.props.pushView({
         name: 'VisualizerView',
         props: {}
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
            setTimeout(() => {
               this.viewData(response.body);
               this.setState({
                  uploading: false,
                  showLoader: false,
               });
            }, 3000);
         });
      }, 500);
   };

   componentDidMount() {
      // Use this to view data without uploading anything (debugging)
      //this.viewData(data);
   }

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
               disableClick>
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
            </Dropzone>
         </Container>
      );
   }
}

export default connect(
   null,
   mapDispatchToProps,
)(MainView);
