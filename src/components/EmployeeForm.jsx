import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import axios from 'axios';

const EmployeeForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneno, setPhoneno] = useState();
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      axios.get("http://localhost:8081/employee/" + id).then((res) => {
        console.log(res.data.data.name);
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setPhoneno(res.data.data.phoneno)
      })
    }
  }, [])

  function submitData(e) {
    e.preventDefault();

    let data = { name: name, email: email, phoneno: phoneno }
    if (id === undefined) {
      axios.put("http://localhost:8081/employee", data).then((res) => {
        console.log(res.data);
        navigate('/')
      }, (err) => {
        console.log(err);
      });
    } else {
      axios.post("http://localhost:8081/employee/" + id, data).then((res) => {
        console.log(res.data);
        navigate('/')
      }, (err) => {
        console.log(err);
      });
    }

  }




  return (
    <>
      <div className='container mt-5' style={{ width: "300px" }}>
        <h1>Add Employee</h1>
        <br />
        <input className='form-control' type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' autoFocus /><br />
        <input className='form-control' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email' /><br />
        <input className='form-control' type="text" value={phoneno} onChange={(e) => { setPhoneno(e.target.value) }} placeholder='Enter Phone No.' /><br />
        <button className='btn btn-primary' onClick={(e) => submitData(e)}>submit</button>
      </div>



    </>
  )
}

export default EmployeeForm