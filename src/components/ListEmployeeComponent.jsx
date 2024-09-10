import React, {useEffect, useState} from 'react'
import { listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const[employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function addNewEmployee() {
        navigator('/add-employee')
    }

    // const dummyData = [
    //     {
    //         "id": 1,
    //         "firstName": "Ramesh",
    //         "lastName": "Fadatare",
    //         "email": "ramesh@gmail.com"
    //     },
    //     {
    //         "id": 2,
    //         "firstName": "Umesh",
    //         "lastName": "Fadatare",
    //         "email": "umesh@gmail.com"
    //     },
    //     {
    //         "id": 3,
    //         "firstName": "Jamesh",
    //         "lastName": "Fadatare",
    //         "email": "jamesh@gmail.com"
    //     }
    // ]


  return (
    <div className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee} >Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee Fist Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent