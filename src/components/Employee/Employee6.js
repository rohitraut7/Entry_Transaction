'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "@/app/globals.css"
import { v4 as uuid } from "uuid";

const Employee = () => {
  const [field, setField] = useState([]);
  const [filSub, setFilSub] = useState([]);
  const [emplist, setEmplist] = useState([]);
  const [editIndex, setEditIndex] = useState(undefined);


  const [emp, setEmp] = useState({
    id: "",
    name: "",
    address: "",
    tel: "",
    field: 0,
    field_Name: "",
    sub: 0,
    sub_Name: ""
  });


  const getFieldOfStudy = async () => {
    try {
      const response = await axios.get("http://localhost:5182/getFieldofstudylist");
      setField(response.data);
    } catch (error) {
      console.error("Error fetching field of study:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
     getFieldOfStudy();
     
  }, []);


  const getFieldOfsubject = async () => {
    if (!emp.field) return;

    try {
      const response = await axios.get(`http://localhost:5182/getSubjectbyCourseId?courseid=${emp.field}`);
      setFilSub(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    getFieldOfsubject();
  }, [emp.field]);

  const handleonchange = (e) => {
    const { name, value } = e.target;

    setEmp((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "field") {
      const selectedField = field.find((item) => item.id === Number(value));
      setEmp((prev) => ({
        ...prev,
        field_Name: selectedField ? selectedField.name : "",
        sub: "",
        sub_Name: ""
      }));
    }

    if (name === "sub") {
      const selectedSub = filSub.find((item) => item.sid === Number(value));
      setEmp((prev) => ({
        ...prev,
        sub_Name: selectedSub ? selectedSub.sname : ""
      }));
    }
  };

  const AddEmp = () => {
    if (editIndex !== undefined) {
      const updatedEmpList = emplist.map((item, index) =>
        index === editIndex ? emp : item
      );
      setEmplist(updatedEmpList);
      setEditIndex(undefined);
    } else {
      setEmplist((prev) => [...prev, emp]);
    }

    setEmp((prev) => ({
      ...prev,
      field: "",
      field_Name: "",
      sub: "",
      sub_Name: ""
    }));

  };

  const handleEditEmp = (index) => {
    setEditIndex(index);
    setEmp(emplist[index]);
  };

  const handleDelEmp = (index) => {
    setEmplist((prev) => prev.filter((_, ind) => ind !== index));
  };

  const generateIntegerFromUUID = () => {
    const unique_id = uuid();
    const numbersOnly = unique_id.replace(/\D/g, ''); // Remove non-digits
    return parseInt(numbersOnly.substring(0, 3), 10); // Take first 3 digits as an integer
  };

  const handleSavestudy = async () => {
    try {
      const postData = {
        id: generateIntegerFromUUID(),
        name: emp.name,
        address:emp.address,
        Tel:emp.tel,
        sub: emplist.map((item)=>{ 
          return{
            field: Number(item.field),
            sub: Number(item.sub)
          }
         })
      };



    
      const response = await axios.post("http://localhost:5182/SaveStudentdetails", postData);
      alert(response.data);


      setEmplist([]);
    } catch (error) {
      console.error("Error saving employee:", error.response?.data || error.message);
    }
  };

   console.log('dk field',field);
   

  return (
    <div className='container'>
      <div className='form-container'>
        <input type='text' name='name' value={emp.name} onChange={handleonchange} placeholder='Name' />
        <input type='text' name='address' value={emp.address} onChange={handleonchange} placeholder='Address' />
        <input type='tel' name='tel' value={emp.tel} onChange={handleonchange} placeholder='Tel' />

        <select name='field' onChange={handleonchange} value={emp.field || ""}>
          <option value="">Select Field</option>
          {field.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <select name='sub' value={emp.sub || ""} onChange={handleonchange}>
          <option value="">Select Subject</option>
          {filSub.map((item) => (
            <option key={item.sid} value={item.sid}>{item.sname}</option>
          ))}
        </select>

        <button type='button' onClick={AddEmp}>{editIndex !== undefined ? "Update" : "Add"}</button>

        <div className='table-container'>
          <h2>Submitted Data</h2>
          <table>
            <thead>
              <tr>
               
                <th>Field</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {emplist.map((item, index) => (
                <tr key={index}>
                  
                  <td>{item.field_Name}</td>
                  <td>{item.sub_Name}</td>
                  <td>
                    <button onClick={() => handleEditEmp(index)}>Edit</button>
                    <button onClick={() => handleDelEmp(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="button" onClick={handleSavestudy}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Employee;
