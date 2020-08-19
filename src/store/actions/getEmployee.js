import { types } from '../constants'
import axios from 'axios'

const getEmployeeLoading = () => {
    return {
        type: types.GET_EMPLOYEE
    }
}

const getEmployeeSuccess = (response) => {
    return {
        type: types.GET_EMPLOYEE_SUCCESS,
        payload: response
    }
}

const getEmployeeFailure = (error) => {
    return {
        type: types.GET_EMPLOYEE_ERROR,
        payload: error
    }
}

const getEmployee = (employeeId) => {
    return (dispatch) => {
        dispatch(getEmployeeLoading())
        axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${employeeId}`).then(response => {
            const success = response.data
            dispatch(getEmployeeSuccess(success))
        }).catch(error => {
            const errorMsg = error.message
            dispatch(getEmployeeFailure(errorMsg))
        })
    }
}

export default getEmployee