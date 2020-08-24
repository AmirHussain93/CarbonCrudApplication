import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('Contains React.Fragment', function() {
    const wrapper = shallow(<App />); 
    expect(wrapper.find('Fragment').length).to.equal(1);
  });

  it('Contains component AppHeader', function() {
      const wrapper = shallow(<App />).childAt(0).dive().childAt(0);
      const content = wrapper.find(`[data-test='appHeader']`)
      expect(content.length).to.equal(1);
  })
});