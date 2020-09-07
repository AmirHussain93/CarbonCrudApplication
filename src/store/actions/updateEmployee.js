import { types } from '../constants'
import axios from 'axios'

const updateEmployeeLoading = () => {
    return {
        type: types.UPDATE_EMPLOYEE
    }
}

const updateEmployeeSuccess = (response) => {
    return {
        type: types.UPDATE_EMPLOYEE_SUCCESS,
        payload: response
    }
}

const updateEmployeeFailure = (error) => {
    return {
        type: types.UPDATE_EMPLOYEE_ERROR,
        payload: error
    }
}

const updateEmployee = (employee) => {
    return (dispatch) => {
        dispatch(updateEmployeeLoading())
        axios.put(`${process.env.REACT_APP_SERVER_URL}/employees/${employee.id}`, employee).then(response => {
            const success = response.data
            dispatch(updateEmployeeSuccess(success))
        }).catch(error => {
            const errorMsg = error.message
            dispatch(updateEmployeeFailure(errorMsg))
        })
    }
}

export default updateEmployee