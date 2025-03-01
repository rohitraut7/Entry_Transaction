'use client'

import React, { useState } from 'react';
import '@/app/globals.css'


const Employee = () => {


   const [field,setField] = useState([
    {id:1 , name: "Science"},
    {id:2 , name: "Commerce"},
    {id:3 , name: "Arts"},
    {id:4 , name: "Bit"}
   ]);

   const [sub,setSub] = useState([
    {fid:1 , id:1 , name: "Physics"},
    {fid:1 , id:2 , name: "Biology"},
    {fid:1 , id:3 , name: "Chemistry"},

    {fid:2 , id:1 , name: "Economics"},
    {fid:2 , id:2 , name: "Accounting"},
    {fid:2 , id:3 , name: "Business Studies"},

    {fid:3 , id:1 , name: "History"},
    {fid:3 , id:2 , name: "Literature"},
    {fid:3 , id:3 , name: "Philosophy"},

    {fid:4 , id:1 , name: "No Subject"},
   ]);

   const [filSub,setFilSub]=useState([]);

  const [emp,setEmp] = useState({
    name : "",
    address : "",
    tel : "",
    field : "",
    field_Name: "",
    sub : "",
    sub_Name: ""

  })

  const [editIndex,setEditIndex]=useState(undefined)








  const handleonchange = (e) => {
    const { id, value } = e.target;
    setEmp((prev) => ({
      ...prev,
      [id]: value
    }))

    if(id=='field'){
     const filterSub=sub.filter((item)=> item.fid==value)
     setFilSub(filterSub);
     
     const fname=field.filter((item)=> item.id==value);

     setEmp((prev)=>(
      {
       ...prev,
       field_Name:fname[0].name
      }
     ))
    }

    if(id=="sub"){
      const filsubname = filSub?.filter((item)=> item.id==value)[0];

      setEmp((prev)=>(
      {
        ...prev,
        sub_Name:filsubname.name
      }))
    }

  }


  const AddEmp = () => {
   

    if (editIndex !=undefined ){
       console.log('editIndex', editIndex);
       
      const  femplist=emplist.filter((item,index)=> index !=editIndex );
   
        console.log('femplist',femplist)
    
      setEmplist(femplist);
      
      setEditIndex(undefined);
    }
   
    setEmplist((pv) => [...pv, emp])

    setEmp({
      name: "",
      address: "",
      tel: "",
      field: "",
      sub: ""
    })
  }




  const [emplist,setEmplist] = useState([])
  console.log("Employee List",emplist);
  
 const handleEditEmp=(index, item)=>{
  // console.log('index', index);
  //  console.log('item', item);
  // console.log(' item get by index', emplist[index])

  //const obj=Object.assign({},emplist[index]) ;
 
      setEditIndex(index)
  
      setEmp(emplist[index])
  }  

 const handleDelEmp=(index)=>{

   const objList=emplist.filter((item,ind)=>  ind !=index)
   setEmplist(objList);
  }

  console.log('index vlaue', editIndex)
  console.log('emp',emp)
  console.log('emplist',emplist)

  return (
    <>
      <div className='container'>
        <div className='form-container'>
        <input type="text" name='name'  id='name' value={emp.name} onChange={handleonchange} placeholder='Name'/>
          <input type="text" name='address' id='address' value={emp.address} onChange={(handleonchange)} placeholder="Address" />
          <input type='tel' name='tel' id='tel' value={emp.tel} onChange={handleonchange} placeholder='Number'/>

          <select name='field' id='field'  onChange={handleonchange}  value={emp.field || ""}>
            <option value="">Select</option>
            {
              field.map((item,ind) =>(
                <option key={ind} value={item.id}> {item.name} </option>
              ))
            }
          </select>

          <select name='sub' id='sub'  onChange={handleonchange}  value={emp.sub || ""}>
            <option value="">Select Subject</option>
            {
              filSub.map((item,ind) =>(
                <option key={ind} value={item.id}> {item.name} </option>
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
                  <th>Telephone_No</th>
                  <th>Field</th>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                emplist?.map((item, index) => (
                  <tr key={index} >
                    <td >{item?.name}</td>
                    <td >{item?.address}</td>
                    <td >{item?.tel}</td>
                    <td >{item?.field_Name}</td>
                    <td >{item?.sub_Name}</td>
                    <td className='action-buttons'> 
                      
                      <button type='button' onClick={()=>{
                       handleEditEmp(index,item);
                    }}>
                       Edit
                      </button>
                      <button type='button' onClick={()=>{
                       handleDelEmp(index,item);
                      }}>
                        Delete
                      </button>

                      
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