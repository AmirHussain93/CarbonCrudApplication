import { types } from '../constants'
import axios from 'axios'

const getEmployeesLoading = () => {
    return {
        type: types.GET_EMPLOYEES
    }
}

const getEmployeesSuccess = (response) => {
    return {
        type: types.GET_EMPLOYEES_SUCCESS,
        payload: response
    }
}

const getEmployeesFailure = (error) => {
    return {
        type: types.GET_EMPLOYEES_ERROR,
        payload: error
    }
}

const getEmployees = () => {
    return (dispatch) => {
        dispatch(getEmployeesLoading())
        axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`).then(response => {
            const success = response.data
            dispatch(getEmployeesSuccess(success))
        }).catch(error => {
            const errorMsg = error.message
            dispatch(getEmployeesFailure(errorMsg))
        })
    }
}

export default getEmployees