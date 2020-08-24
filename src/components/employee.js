import React from 'react'
import { connect } from 'react-redux';
import { Form, FormGroup, TextInput, Button } from 'carbon-components-react';
import '../app.scss';

import getEmployee from '../store/actions/getEmployee'
import createEmployee from '../store/actions/createEmployee'
import updateEmployee from '../store/actions/updateEmployee'
import { clearEmployeeSuccess } from '../store/actions/clearState'

function Employee(props) {
    const { createEmployee, updateEmployee, getEmployee, employeeData, createSuccess, updateSuccess, clearEmployeeSuccess } = props
    const [newEmployee, setNewEmployee] = React.useState({
        name: "",
        role: "",
        ctc: 0
    })

    const onChangeHandler = (event) => {
        setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = () => {
        if (newEmployee.id) {
            updateEmployee(newEmployee)
        } else {
            createEmployee(newEmployee)
        }
    }

    React.useEffect(() => {
        if (props.match.params.id) {
            getEmployee(props.match.params.id)
        }
    }, [getEmployee])

    React.useEffect(() => {
        if (employeeData) {
            setNewEmployee({ ...employeeData })
        }
    }, [employeeData])

    React.useEffect(() => {
        if (createSuccess || updateSuccess) {
            props.history.push('/employees')
        }
    }, [createSuccess, updateSuccess])

    React.useEffect(() => {
        return () => {
            clearEmployeeSuccess()
        }
    }, [])

    return (
        <div className="add-form">
            <Form>
                <FormGroup className="form-title" legendText={props.match.params.id ? "Update Employee" : "Add Employee"}>
                    <div className="form-group-child">
                        <TextInput
                            className="addform-inputs"
                            id="name"
                            name="name"
                            value={newEmployee.name}
                            onChange={onChangeHandler}
                            labelText={<><span>Employee Name </span><span className="imp-field">*</span></>}
                            placeholder="Enter Name"
                            type="text"
                        />
                        <TextInput
                            className="addform-inputs"
                            id="role"
                            name="role"
                            value={newEmployee.role}
                            onChange={onChangeHandler}
                            labelText={<><span>Role </span><span className="imp-field">*</span></>}
                            placeholder="Role"
                            type="text"
                        />
                        <TextInput
                            className="addform-inputs"
                            id="ctc"
                            name="ctc"
                            value={newEmployee.ctc}
                            onChange={onChangeHandler}
                            labelText={<><span>CTC </span><span className="imp-field">*</span></>}
                            placeholder="CTC"
                            type="number"
                        />
                        <Button
                            className="add-form-btn"
                            data-test="addOrUpdateEmployee"
                            onClick={() => onSubmitHandler()}
                            disabled={!newEmployee.name|| !newEmployee.role || !newEmployee.ctc ? true : false}
                        >
                            { props.match.params.id ? "Update Employee" : "Add Employee"}
                        </Button>
                    </div>
                </FormGroup>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        employeeData: state.employee.employeeData,
        createSuccess: state.employee.createSuccess,
        updateSuccess: state.employee.updateSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployee: (id) => dispatch(getEmployee(id)),
        createEmployee: (data) => dispatch(createEmployee(data)),
        updateEmployee: (data) => dispatch(updateEmployee(data)),
        clearEmployeeSuccess: () => dispatch(clearEmployeeSuccess()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)