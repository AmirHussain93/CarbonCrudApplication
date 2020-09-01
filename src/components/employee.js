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
        ctc: 0,
        isExpanded: false
    })
    const [step, setStep] = React.useState(1);
    const [nameError, setNameError] = React.useState(false);
    const [roleError, setRoleError] = React.useState(false);
    const [ctcError, setCtcError] = React.useState(false);

    React.useEffect(() => {
        if(Object.keys(props.match.params).length === 0) {
            setNewEmployee({...newEmployee, name: "", role: "", ctc: 0, isExpanded: false })
            setStep(1);
        }
    }, [props.match.params])

    const onChangeHandler = (event) => {
        setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value })
        setNameError(false)
        setRoleError(false)
        setCtcError(false)
    }

    const onSubmitHandler = () => {

        if (!newEmployee.ctc) {
            setCtcError(true);
        } else if (newEmployee.id) {
            updateEmployee(newEmployee)
        }  else {
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

    const handleNext = () => {
        if (step === 1) {
            if (newEmployee.name.trim()) {
                setStep(step + 1);
            } else {
                setNameError(true)
            }
        } else if (step === 2) {
            if (newEmployee.role.trim()) {
                setStep(step + 1);
            } else {
                setRoleError(true)
            }
        }
    }

    const handlePrev = () => {
        setStep(step - 1);
    }

    return (
        <div className="add-form">
            <Form>
                <FormGroup className="form-title" legendText={props.match.params.id ? "Update Employee" : "Add Employee"}>
                    <div className="form-group-child">
                        {
                            step === 1 && <TextInput
                            className="addform-inputs"
                            id="name"
                            name="name"
                            value={newEmployee.name}
                            onChange={onChangeHandler}
                            labelText={<><span>Employee Name </span><span className="imp-field">*</span></>}
                            placeholder="Enter Name"
                            type="text"
                            />
                           
                        }
                        {
                                nameError && <> <br /><span className="imp-field"> Please enter employee name.</span></>
                        }
                        {
                            step === 2 && <TextInput
                            className="addform-inputs"
                            id="role"
                            name="role"
                            value={newEmployee.role}
                            onChange={onChangeHandler}
                            labelText={<><span>Role </span><span className="imp-field">*</span></>}
                            placeholder="Role"
                            type="text"
                            />
                        }
                        {
                            roleError && <> <br /><span className="imp-field">Please enter role for the employee.</span></>
                        }
                        {
                            step === 3 && <TextInput
                            className="addform-inputs"
                            id="ctc"
                            name="ctc"
                            value={newEmployee.ctc}
                            onChange={onChangeHandler}
                            labelText={<><span>CTC </span><span className="imp-field">*</span></>}
                            placeholder="CTC"
                            type="number"
                            />
                        }
                        {
                            ctcError && <> <br /><span className="imp-field">Please enter CTC for an employee.</span></>
                        }
                        
                        
                        {
                            step !== 3 && <Button className="step-btn" onClick={handleNext}> Next</Button>
                        }
                        {
                            step !== 1 && <Button className="step-btn prev-btn" onClick={handlePrev}>Previous</Button>
                        }
                        
                        {
                            step === 3 &&
                            <Button
                                className="add-form-btn"
                                data-test="addOrUpdateEmployee"
                                onClick={() => onSubmitHandler()}
                                // disabled={!newEmployee.name|| !newEmployee.role || !newEmployee.ctc ? true : false}
                            >
                                { props.match.params.id ? "Update Employee" : "Add Employee"}
                            </Button>
                        }
                        
                        
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