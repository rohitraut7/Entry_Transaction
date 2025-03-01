"use client"
import React, { useEffect, useState } from 'react';
import "@/app/globals.css"; // Import the CSS file

const Employee = () => {

    const [name,setName]=useState("");
    const [address,setAddress]=useState("");
    const [tel,setTel]=useState("");

    // useEffect(()=>{
    //     // setName("rohit")
    //     console.log('roht')
    // })


    const handleChangeName=(e)=>{
         const { value } = e.target;
     //  console.log("value",value);
    //    console.log("name",name);
    //    console.log("id",id);

      setName(value)

    }
    
    function changeTel(value){
        setTel(value)
    }


    return (
        <>
        <div className="container">
         <div className="form-container">
          <input type="text" name="name" id="dk" value={name} onChange={handleChangeName}  placeholder="Name" />
          <input type="text" name="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="Address" required />
          <input type="tel" name="phone" value={tel} onChange={(e)=>{changeTel(e.target.value)}}  placeholder="Phone Number" required />


          <select name="fieldOfStudy" onChange={()=>{}} value="">
            <option value="">Select Field of Study</option>
            <option value="">Science</option>
            <option value=""> Commerce</option>
            <option value="">Arts </option>
          </select>
    
          <button type="button">Add</button>
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
                <tr>
                  <td>Rohit</td>
                  <td>Ktm</td>
                  <td>3121212</td>
                  <td>Science</td>
                  <td>Computer</td>
                </tr>
            </tbody>
          </table>
            </div>
          </div>
        </>
    );
};

export default Employee;