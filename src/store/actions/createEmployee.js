import { types } from '../constants'
import axios from 'axios'

const createEmployeeLoading = () => {
    return {
        type: types.CREATE_EMPLOYEE
    }
}

const createEmployeeSuccess = (response) => {
    return {
        type: types.CREATE_EMPLOYEE_SUCCESS,
        payload: response
    }
}

const createEmployeeFailure = (error) => {
    return {
        type: types.CREATE_EMPLOYEE_ERROR,
        payload: error
    }
}

const createEmployee = (employee) => {
    return (dispatch) => {
        dispatch(createEmployeeLoading())
        axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`,employee).then(response => {
            const success = response.data
            dispatch(createEmployeeSuccess(success))
        }).catch(error => {
            const errorMsg = error.message
            dispatch(createEmployeeFailure(errorMsg))
        })
    }
}

export default createEmployee