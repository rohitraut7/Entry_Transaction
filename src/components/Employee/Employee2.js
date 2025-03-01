"use client"
import React, { useEffect, useState } from 'react';
import "@/app/globals.css";

const Employee = () => {

  const [emp, setEmp] = useState({
    name: "",
    address: "",
    tel: "",
    study: "Commerce"
  })



  const handInputChange = (e) => {
    const { id, value } = e.target;
    console.log('id =', id);
    console.log('value =', value);
    setEmp((prev) => ({
      ...prev,
      [id]: value,

    }))


    console.log('emp', emp)

  }

  const AddEmp = () => {
    setEmpList((pv) => [...pv, emp])

  }

  const [empList, setEmpList] = useState([]);




  console.log("empList", empList);

  return (
    <>
      <div className="container">
        <div className="form-container">
          <input type="text" name="name" id="name" value={emp.name} onChange={handInputChange} placeholder="Name" />
          <input type="text" name="address" id="address" value={emp.address} onChange={handInputChange} placeholder="Address" required />
          <input type="tel" name="tel" id="tel" value={emp.tel} onChange={handInputChange} placeholder="Phone Number" required />


          <select name="fieldOfStudy" id="study" onChange={handInputChange} value={emp.study}>
            {/* <option value="">Select Field of Study</option> */}
            <option value="Science">Science</option>
            <option value="Commerce"> Commerce</option>
            <option value="Arts">Arts </option>
          </select>

          <button type="button" onClick={AddEmp}>Add</button>
        </div>


        <div className="table-container">
          <h2>Submitted Data</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Field</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {
                empList.map((item, index) => (
                  <tr key={index}>
                    <td >{item.name}</td>
                    <td >{item.address}</td>
                    <td >{item.tel}</td>
                    <td >{item.study}</td>
                  </tr>
                ))
              }


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;