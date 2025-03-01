'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "@/app/globals.css"

const Employee = () => {

  const [field,setField] = useState([])
  const [emp,setEmp] = useState({
    name: "",
    address: "",
    tel: "",
    field:"",
    sub:""

  })
  const [emplist,setEmplist] = useState([])
  const [editIndex,setEditIndex] = useState(undefined)
  const [filSub,setFilSub] = useState([])



  // const [sub,setSub] = useState([
  //   {fid:1 , id:1 , name: "Physics"},
  //   {fid:1 , id:2 , name: "Biology"},
  //   {fid:1 , id:3 , name: "Chemistry"},

  //   {fid:2 , id:1 , name: "Economics"},
  //   {fid:2 , id:2 , name: "Accounting"},
  //   {fid:2 , id:3 , name: "Business Studies"},

  //   {fid:3 , id:1 , name: "History"},
  //   {fid:3 , id:2 , name: "Literature"},
  //   {fid:3 , id:3 , name: "Philosophy"},

  //   {fid:4 , id:1 , name: "BA"},
  // ])



  useEffect(()=>{

    const getFieldOfStudy = async () => {
      try {
       
          const response = await axios.get("http://localhost:5182/getFieldofstudylist");
         console.log(response.data);
         setField(response.data);
        

      } catch (error) {
         console.error("Error saving employee:", error.response ? error.response.data : error.message);
      }
  };

  getFieldOfStudy();

  },[]);

  useEffect(()=>{
    const getFieldOfsubject = async () => {
      try {
       
        const response = await axios.get(`http://localhost:5182/getSubjectbyCourseId?courseid=${emp.field}`);
        console.log('dk sub',response.data);
        setFilSub(response.data);
        //setField(response.data);
        
      } catch (error) {
         console.error("Error saving employee:", error.response ? error.response.data : error.message);
      }
  };

   if(emp.field){
    getFieldOfsubject();
     }

  },[emp.field]);



  const handleonchange = (e) => {
    const {id, value} = e.target;
    
    setEmp((prev) =>({
      ...prev,
      [id]:value
    }))

    if (id === "field") {
      // const filterSub = sub.filter((item) => item.fid === Number(value));
      // setFilSub(filterSub); // Updates subject list based on field selection
  
      const fname = field.find((item) => item.id === Number(value));
  
      setEmp((pv) => ({
          ...pv,
          field_Name: fname ? fname.name : "",
          sub: "", // Reset subject when field changes
          sub_Name: ""
      }));
  }
  
  if (id === "sub") {
      const filSubname = filSub.find((item) => item.sid === Number(value));
  
      setEmp((pv) => ({
          ...pv,
          sub_Name: filSubname ? filSubname.sname : ""
      }));
  }
  
    

  }

  const AddEmp = () => {

    if (editIndex !== undefined) {
      console.log("editIndex",editIndex);

      const updatedEmpList = emplist.map((item,index) =>
        index === editIndex ? emp : item        
      );
      console.log("updateEmplist",updatedEmpList);

      setEmplist(updatedEmpList);
      setEditIndex(undefined);
    }

    
    setEmplist((pv) => [...pv, emp])
    setEmp({
      name: "",
      address: "",
      tel: ""
    })
    
  }





      




  const handleDelEmp = (index) => {
    const objList = emplist.filter((item, ind) => ind !== index); 
    setEmplist(objList);
  };


  const handleEditEmp = (index, item) => {
    setEditIndex(index);
    
    setEmp({ ...item });
  };


console.log('emp',emp)



  return (
    <>
    <div className='container'>
      <div className='form-container'>
      <input type='text' id='name' name='name'  value={emp.name}  onChange={handleonchange} placeholder='Name'  />
      <input type='text' id='address' name='address'  value={emp.address}  onChange={handleonchange} placeholder='Address'  />
      <input type='tel' id='tel' name='tel'  value={emp.tel}  onChange={handleonchange} placeholder='Tel'  />


      <select name='field' id='field' onChange={handleonchange} value={emp.field || ""} >
        <option value="">Select</option>
        {
          field.map((item,ind) => (
            <option key={ind} value={item.id}> {item.name}</option>
          ))
        }
      </select>

      <select name='sub' id='sub' value={emp?.sub || ""} onChange={handleonchange}>
        <option value="">Select Subject</option>
        {
          filSub.map((item,ind) =>(
            <option key={ind} value={item.sid}>{item.sname}</option>
          ))
        }
      </select>
            
      <button type='button' onClick={AddEmp}>Add</button>

      <div className='table-container'>
        <h2>Submitted Data</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Telephone</th>
              <th>Field</th>
              <th>subject</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              emplist?.map((item,index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.address}</td>
                  <td>{item?.tel}</td>
                  <td>{item?.field_Name}</td>
                  <td>{item?.sub_Name}</td>

                  <td className='action-buttons'>

                    <button type='button' onClick={()=>{
                      handleEditEmp(item,index);
                    }}>Edit</button>

                    <button type='button' onClick={()=>{
                      handleDelEmp(item,index);
                    }}>Delete</button>

                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
            
      </div>

    </div>



        





      
    </>
  );
};

export default Employee;