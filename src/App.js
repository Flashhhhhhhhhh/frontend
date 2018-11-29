import React, { Component } from 'react';
import Flash from './js';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   body {
      height: 100%;
      background: #E9EEF4;
      font-family: sans-serif;
   }
`;
class App extends Component {
   render() {
      return (
         <div className="App">
            <GlobalStyles />
            <Flash />
         </div>
      );
   }
}

export default App;
