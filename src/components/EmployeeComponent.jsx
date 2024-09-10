import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigator = useNavigate();

    const {id} = useParams();
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: ''
    })

    function saveEmployee(e) {
        e.preventDefault();

        if(validateForm()){
            const employee = {first_name, last_name, email}
            console.log(employee)
    
            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator('/employees')
            })
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors}

        if(first_name.trim()){
            errorsCopy.first_name = ''
        }else{
            errorsCopy.first_name = 'First name is required.';
            valid = false;
        }

        if(last_name.trim()){
            errorsCopy.last_name = ''
        }else{
            errorsCopy.last_name = 'Last name is required.';
            valid = false
        }

        if(email.trim()){
            errorsCopy.email = ''
        }else{
            errorsCopy.email = 'Email is required.';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }

    }

  return (
    <div className='conatainer'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {/* <h2 className='text-center'>Add Employee</h2> */}
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'> First Name</label>
                            <input 
                                type='text'
                                placeholder='Enter first name'
                                name= 'firstName'
                                value={first_name}
                                className= {`form-control ${ errors.first_name ? 'is-invalid' : ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            { errors.first_name && <div className='invalid-feedback'>{errors.first_name}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'> Last Name</label>
                            <input 
                                type='text'
                                placeholder='Enter last name'
                                name= 'lastName'
                                value={last_name}
                                className={`form-control ${ errors.last_name ? 'is-invalid' : ''}`}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            { errors.last_name && <div className='invalid-feedback'>{errors.last_name}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'> Email </label>
                            <input 
                                type='text'
                                placeholder='Enter email'
                                name= 'email'
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid' : ''}`}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            { errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent