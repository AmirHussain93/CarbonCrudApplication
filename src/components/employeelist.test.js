import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { configure, shallow, mount } from 'enzyme'
import EmployeeList from './employeelist'
import Adapter from 'enzyme-adapter-react-16'
import rootReducer from '../store/rootReducer'
import { middlewares } from '../store/store'

const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}

configure({ adapter: new Adapter() });

describe('render employeelist component', () => {
    let store;
    let historyMock;

    beforeEach(() => {
        store = testStore();
        historyMock = { push: jest.fn() };
    });

    it('Should render a button', () => {
        const wrapper = shallow(<EmployeeList store={store} />).childAt(0).dive().childAt(0).dive();
        const button = wrapper.find("[data-test='addNew']");
        expect(button.length).toEqual(1);
    });

    it('Test add new employee click event', () => {
        const wrapper = shallow(<EmployeeList store={store} history={historyMock}/>).childAt(0).dive().childAt(0).dive();
        const button = wrapper.find("[data-test='addNew']");
        button.simulate('click');
        expect(historyMock.push.mock.calls[0][0]).toEqual('employee/new');
    })
})