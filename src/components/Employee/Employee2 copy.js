'use client'
import React, { useState } from 'react';
import '@/app/globals.css';

const Employee = () => {

  const [emp,setEmp] = useState({
    name:"",
    address:"",
    tel:"",
    field:""

  })

  


  const handleonchange = (e) => {
    const { id, value } = e.target;
    setEmp((prev) => ({
      ...prev,
      [id]:value
    }))
    
  } 

  const AddEmp =() => {
    setEmplist((pv) => [...pv,emp])


    setEmp({
      name:"",
      address:"",
      tel:"",
      field:"",
      study:""
    })
    
  }



  const [emplist,setEmplist] = useState([]);

  console.log("employee list",emplist);

 




  return (
    
      <>
      <div className='container'>
        <div className='form-container'>
          <input type="text" name='name'  id='name' value={emp.name} onChange={handleonchange} placeholder='Name'/>
          <input type="text" name='address' id='address' value={emp.address} onChange={(handleonchange)} placeholder="Address" />
          <input type='tel' name='tel' id='tel' value={emp.tel} onChange={handleonchange} placeholder='Number'/>

          <select name='fieldofstudy' id='field' value={emp.study} onChange={handleonchange}>
            <option >Field of study</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
          </select>

          <button type='button' onClick={AddEmp}>Add</button>

        </div>

        <div className='table-container'>
          <h2>submittedData</h2>
          <table>
            <thead>
              <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Field</th>
              {/* <th>Study</th> */}
              </tr>
            </thead>

            <tbody>
              {
                emplist.map((item,index) =>
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.tel}</td>
                    <td>{item.field}</td>
                  </tr>
                )
              }
            </tbody>

          </table>
        </div>

      </div>

      </>  
      
  );
};

export default Employee;