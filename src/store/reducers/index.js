import { types } from '../constants'

const intialState = {
    loading: false,
    error: "",
    createSuccess: "",
    employeesData: "",
    employeeData: "",
    updateSuccess: "",
    deleteSuccess: ""
}

const employeeReducer = (state = intialState, action) => {
    switch (action.type) {
        case types.CREATE_EMPLOYEE:
            return {
                ...state,
                loading: true,
                createSuccess: "",
                error: "",
            }
        case types.CREATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                createSuccess: action.payload,
                error: "",
            }
        case types.CREATE_EMPLOYEE_ERROR:
            return {
                ...state,
                loading: false,
                createSuccess: "",
                error: action.payload,
            }
        case types.GET_EMPLOYEE:
            return {
                ...state,
                loading: true,
                employeeData: "",
                error: "",
            }
        case types.GET_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employeeData: action.payload,
                error: "",
            }
        case types.GET_EMPLOYEE_ERROR:
            return {
                ...state,
                loading: false,
                employeeData: "",
                error: "",
            }
        case types.GET_EMPLOYEES:
            return {
                ...state,
                loading: true,
                employeesData: "",
                error: "",
            }
        case types.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading: false,
                employeesData: action.payload,
                error: "",
            }
        case types.GET_EMPLOYEES_ERROR:
            return {
                ...state,
                loading: false,
                employeesData: "",
                error: "",
            }
        case types.UPDATE_EMPLOYEE:
            return {
                ...state,
                loading: true,
                updateSuccess: "",
                error: "",
            }
        case types.UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                updateSuccess: action.payload,
                error: "",
            }
        case types.UPDATE_EMPLOYEE_ERROR:
            return {
                ...state,
                loading: false,
                updateSuccess: "",
                error: action.payload,
            }
        case types.DELETE_EMPLOYEE:
            return {
                ...state,
                loading: true,
                deleteSuccess: "",
                error: "",
            }
        case types.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteSuccess: action.payload,
                error: "",
            }
        case types.DELETE_EMPLOYEE_ERROR:
            return {
                ...state,
                loading: false,
                deleteSuccess: "",
                error: action.payload,
            }
        case types.CLEAR_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: "",
                createSuccess: "",
                employeeData: "",
                updateSuccess: "",
            }
        }
        case types.CLEAR_DELETE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: "",
                deleteSuccess: "",
            }
        }
        default:
            return state
    }
}

export default employeeReducer