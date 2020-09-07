import { types } from '../constants'
import axios from 'axios'

const deleteEmployeeLoading = () => {
    return {
        type: types.DELETE_EMPLOYEE
    }
}

const deleteEmployeeSuccess = (response) => {
    return {
        type: types.DELETE_EMPLOYEE_SUCCESS,
        payload: response
    }
}

const deleteEmployeeFailure = (error) => {
    return {
        type: types.DELETE_EMPLOYEE_ERROR,
        payload: error
    }
}

const deleteEmployee = (employeeId) => {
    return (dispatch) => {
        dispatch(deleteEmployeeLoading())
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/employees/${employeeId}`).then(response => {
            const success = response.data
            dispatch(deleteEmployeeSuccess(success))
        }).catch(error => {
            const errorMsg = error.message
            dispatch(deleteEmployeeFailure(errorMsg))
        })
    }
}

export default deleteEmployee