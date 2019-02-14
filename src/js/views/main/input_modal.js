import React, { Component } from 'react';
import styled from 'styled-components';
import { FileInput, Button } from '../../toolbox';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 50vh;
   width: 100%;
   max-width: 40em;
   background: white;
`;

const WelcomeContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   justify-content: center;
   text-align: center;
`;

const initialState = {
   curFile: null,
   loading: false,
};

const PreviewContainer = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;

   img {
      max-height: 5em;
   }
`;

const Row = styled.div`
   display: flex;
`;

const Text = styled.h3`
   margin: 0 auto;
   color: #2c4358;
   font-size: 23px;
   font-weight: 400;
`;

class InputModal extends Component {
   constructor() {
      super();
      this.state = initialState;
   }

   reset = () => {
      this.setState(initialState);
   };

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
         'http://ec2-34-229-208-64.compute-1.amazonaws.com:5000/test/test';
      this.makeRequest({ url }).then(response => {
         setTimeout(() => {
            setTimeout(() => {
               this.setState({ loading: false, curFile: file });
            }, 300);
         }, 0);
      });
   };

   submit = () => {
      console.log(this.state);
      this.props.onSubmit({
         name: 'hi', //this.state.curFile[0].name,
      });
   };

   render() {
      const { loading, curFile } = this.state;

      return (
         <Container>
            <WelcomeContainer>
               {!!curFile ? (
                  <PreviewContainer>
                     <img
                        alt="icon"
                        src={`images/${curFile[0].name.split('.')[1]}_icon.svg`}
                     />
                     <Text>{curFile[0].name}</Text>
                     <Row>
                        <Button label="Restart" onClick={this.reset} />
                        <Button
                           theme="primary"
                           label="Visualize"
                           onClick={this.submit}
                        />
                     </Row>
                  </PreviewContainer>
               ) : (
                  <h2>Welcome!</h2>
               )}
               {!!curFile ? (
                  <Text>Data successfully uploaded and parsed</Text>
               ) : (
                  <Text>Add a dataset below to get started</Text>
               )}
            </WelcomeContainer>
            <FileInput loading={loading} onUpload={this.handleFile} />
         </Container>
      );
   }
}

export default InputModal;
