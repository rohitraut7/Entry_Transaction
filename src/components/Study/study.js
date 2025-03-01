'use client'
import React, { useState } from 'react';
import axios from 'axios';
import "@/app/globals.css"

// dk dkd 

const Study = () => {

    // dk  raut

    // raut 

    // dfdfed
    const [formData,setFormData] = useState({
        id:"",
        name:""
    })

    const handleonchange=(e) => {
        const {name,value} = e.target;
        console.log(name,value);

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }
    const handleSavestudy = async () => {
        try {
         
            const response = await axios.post("http://localhost:5182/SaveFieldOfStudy",formData);
           alert(response.data);
           // console.log("Employee Saved:", response.data);

        } catch (error) {
           console.error("Error saving employee:", error.response ? error.response.data : error.message);
        }
    };
    
    
 
      
       
        
   
    return (
        <>
        <div className='container'>
          <div className='form-container'>
          <input type='text'  name='id'  value={formData?.id}  onChange={handleonchange} placeholder='ENTER ID'  />
          <input type='text'  name='name'  value={formData?.name}  onChange={handleonchange} placeholder='NAME'  />

          <button type="button" onClick={handleSavestudy}>
            Save
          </button>
    
    
          </div>
          
        </div>
    
        </>
      );
};

export default Study;
         
                
    
    
    
    
            
    
    
    
    
    
          
