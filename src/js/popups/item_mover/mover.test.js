import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import ItemMover from './';
import store from '../../rootReducer';

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
   shallow(
      <Provider store={store}>
         <ItemMover />
      </Provider>
   )
});
