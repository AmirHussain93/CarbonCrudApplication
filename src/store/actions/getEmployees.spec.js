import moxios from 'moxios';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../rootReducer'
import { middlewares } from '../store'
import getEmployees from './getEmployees';
import { expect } from 'chai';

const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}

describe('getEmployees list',() => {

    beforeEach(() => {
        moxios.install();
    })

    afterEach(() => {
        moxios.uninstall();
    })

    it('EmployeeList updated correctly', () => {
        const expectedState = [
            {
                "name": "Hema Kumar",
                "role": "Team Lead",
                "ctc": "1250000",
                "id": 1
              },
              {
                "name": "Amir Hussain",
                "role": "Software Engineer",
                "ctc": "550000",
                "id": 2
              },
              {
                "name": "Yogesh",
                "role": "Front end",
                "ctc": "500000",
                "id": 3
              }
        ]

        const store = testStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });

        return store.dispatch(getEmployees())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.employee.employeesData).to.deep.equal(expectedState);
                })
    })
})