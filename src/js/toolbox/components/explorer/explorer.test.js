import React from 'react';
import ReactDOM from 'react-dom';
import ExplorerComponent from './';
import data from './data.json';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
   shallow(<ExplorerComponent id={1} data={data} />)
});
