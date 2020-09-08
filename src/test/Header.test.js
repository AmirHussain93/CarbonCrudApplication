import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import AppHeader from '../components/header';

configure({ adapter: new Adapter() });


describe('Header Component', () => {

    let component;
    beforeEach(() => {
        component = shallow(<AppHeader />)
    })

    it('It should render without errors', () => {
        const wrapper = component.find("[data-test='headerComponent']");
        expect(wrapper.length).to.equal(1);
    });

    it('It should render navigationElement', () => {
        const wrapper = component.find('[data-test="headerNavigation"]');
        expect(wrapper.length).to.equal(1);
    })

    it('It should render correct path for employees list', () => {
        const wrapper = component.find('[data-test="employeesList"]');
        expect(wrapper.props()).to.haveOwnProperty('to', '/employees')
    })

    it('It should render correct path for add new employee', () => {
        const wrapper = component.find('[data-test="newEmployee"]');
        expect(wrapper.props()).to.haveOwnProperty('to', '/employee/new')
    })
    
})