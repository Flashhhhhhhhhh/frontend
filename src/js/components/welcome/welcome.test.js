import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import WelcomeScreen from './';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
   shallow(<WelcomeScreen />);
});
