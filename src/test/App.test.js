import React from 'react';
import { configure, shallow, render} from 'enzyme';
import chai, { expect } from 'chai';
import App from '../App';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App Component testing', function() {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    })

    it('Contains React.Fragment', function() {
        expect(wrapper.find('Fragment').length).to.equal(1);
    });
    
    it('Contains component AppHeader', function() {
        const content = wrapper.find(`[data-test='appHeader']`)
        expect(content.length).to.equal(1);
    })
  
  chai.use(chaiEnzyme())

})