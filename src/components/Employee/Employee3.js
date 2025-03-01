'use client'
import React, { useState } from 'react';
import "@/app/globals.css";



const Employee = () => {

  const [name,setName] = useState("");
  const [address,setAddress] = useState("");
  const [tel,setTel] = useState("");
  const [study,setStudy] = useState("");


  const handleonchange = (e) => {
    const {value} = e.target;
    setName (value)
  }

  function ChangeTel (value){
    setTel(value)
  }

  



  return (
    <div className='container'>
      <div className='form-container'>
      <input type='text' name='name' id='name' value={name} onChange={handleonchange}  placeholder='Name'/>
      <input type='text' name='address' id='address' value={address} onChange={(e)=>{setAddress(e.target.value)}}  placeholder='Address' />
      <input type='number' name='phone' id='tel' value={tel} onChange={(e)=>ChangeTel(e.target.value)}  placeholder='Number'/>

      <select name='fieldofstudy' value={study} onChange={(e)=>{setStudy(e.target.value)}}>
        <option value="">Filed of study</option>
        <option value="1">Science</option>
        <option value="Commerce">Commerce</option>
        <option value="Arts">Arts</option>
      </select>

      <button type="button">Add</button>

      </div>
    </div>
  );
};

export default Employee;