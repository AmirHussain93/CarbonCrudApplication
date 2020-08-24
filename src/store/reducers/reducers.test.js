import { expect } from 'chai';
import rootReducer from '../rootReducer';
import { types } from '../constants';


describe('Reducer testing', () => {
    let defaultState;
    beforeEach(() => {
        defaultState = {
            loading: false,
            error: "",
            createSuccess: "",
            employeesData: "",
            employeeData: "",
            updateSuccess: "",
            deleteSuccess: ""
        }
    })

    it('Should return default state', () => {
        const newState = rootReducer(undefined, {})
        expect(newState.employee).to.deep.include(defaultState);
    });

    it('should handle create employee start', () => {
        const employee = ""
        const newState = rootReducer(undefined, {
            type: types.CREATE_EMPLOYEE,
        });
        expect(newState.employee.createSuccess).to.deep.include(employee);
    })

    it('should handle create employee success', () => {
        const employee = {name: "Amir", role: "Software developer", ctc: 400000};
        const newState = rootReducer(undefined, {
            type: types.CREATE_EMPLOYEE_SUCCESS,
            payload: employee
        });
        expect(newState.employee.createSuccess).to.include(employee);
    })

    it('should handle create employee error', () => {
        const employee = ""
        const newState = rootReducer(undefined, {
            type: types.CREATE_EMPLOYEE_ERROR,
            payload: employee
        });
        expect(newState.employee.createSuccess).to.equal(employee);
    })

})