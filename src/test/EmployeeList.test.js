import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { configure, shallow, mount } from 'enzyme'
import { expect } from 'chai';
import { createMemoryHistory } from 'history'
import EmployeeList from '../components/employeelist'
import Adapter from 'enzyme-adapter-react-16'
import rootReducer from '../store/rootReducer'
import { middlewares } from '../store/store'

const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}

configure({ adapter: new Adapter() });

describe('Employeelist component', () => {

    let store;
    let historyObj;

    beforeEach(() => {
        store = testStore();
        historyObj = createMemoryHistory();
    });

    it('Should render a button', () => {
        const wrapper = shallow(<EmployeeList store={store} />).childAt(0).dive().childAt(0).dive();
        const button = wrapper.find("[data-test='addNew']");
        expect(button.length).to.equal(1);
    });

    it('Testing add new employee click event', () => {
        const wrapper = shallow(<EmployeeList store={store} history={historyObj}/>).childAt(0).dive().childAt(0).dive();
        const button = wrapper.find("[data-test='addNew']");
        button.simulate('click');
        expect(historyObj.location.pathname).to.equal('employee/new');
    })
    
})