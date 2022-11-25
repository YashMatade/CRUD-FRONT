import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Table() {
    const [data, setData] = useState();

    function load() {
        axios.get("http://localhost:8081/employee").then((result) => {
            console.log(result.data.data);
            setData(result.data.data)
        }, (err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        load()
    }, []);


    function deleteEmployee(e, _id) {
        e.preventDefault()
        axios.delete("http://localhost:8081/employee", { data: { id: _id } }).then((res) => {
            console.log(res.data);
            load();
        })
    }


    if (data !== undefined) {
        return (

            <>
                <h1>Employees Data</h1>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 text-right">
                            <Link to="/addemployee"><button className='btn btn-dark'>Add Employee</button></Link> <br /><br />
                        </div>
                    </div>
                </div>
                <table className="table table-dark table-striped container">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phoneno</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phoneno}</td>
                                    <td>
                                        <Link to={"/" + data._id}><button className="btn btn-primary" >update</button></Link> &nbsp;
                                        <button className="btn btn-danger" onClick={(e) => deleteEmployee(e, data._id)}>delete</button>
                                    </td>
                                </tr>
                            })
                        }


                    </tbody>
                </table>
            </>)
    }
    else {
        return <div>waiting...</div>
    }


}

export default Table