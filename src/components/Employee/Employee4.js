"use client"
import React, { useEffect, useState } from 'react';
import "@/app/globals.css";

const Employee = () => {

  const [emp, setEmp] = useState({
    name: "",
    address: "",
    tel: "",
    study: "",
    studyName: "",
    subject: "",
    subjectName: ""
  })

  const [empList, setEmpList] = useState([]);

  const [study, setStudy] = useState([
    { id: 1, name: "Science" },
    { id: 2, name: "Commerce" },
    { id: 3, name: "Arts" },
    { id: 4, name: "BIT" }
  ]);

  const [sub, setSub] = useState([
    { studyid: 1, id: 1, name: "Physics" },
    { studyid: 1, id: 2, name: "Chemistry" },
    { studyid: 1, id: 3, name: "Biology" },
    { studyid: 2, id: 1, name: "Accounting" },
    { studyid: 2, id: 2, name: "Business Studies" },
    { studyid: 2, id: 3, name: "Economics" },
    { studyid: 3, id: 1, name: "History" },
    { studyid: 3, id: 2, name: "Literature" },
    { studyid: 3, id: 3, name: "Philosophy" }
  ]);

  const [filSub, setFilSub] = useState([]);




  const handInputChange = (e) => {
    const { value, name } = e.target
    // setEmp({name:value})
    console.log(name);
    // const obj = {};
    // obj[name] = value;

    // console.log('obj', obj);


    setEmp((pv) => ({
      ...pv,
       [name]:value
      //...obj

    }))


    

    if (name == "study") {
      const filsub = sub.filter((item) => item.studyid == value);
      setFilSub(filsub);



      setFilSub(sub.filter((item)=> item.studyid==value))
      var  objStudeName=study.filter((item)=> item.id==value)
     
       setEmp((pv) => ({
        ...pv,
        studyName:objStudeName[0].name
      }))

    

    }

    if (name == "subject") { 

      var  subName=sub.filter((item)=> item.id==value)
    
      setEmp((pv) => ({
       ...pv,
       subjectName:subName[0].name
     }))

    }
 

  }





  const AddEmp = () => {
    setEmpList((pv) => [...pv, emp])
    setEmp({
      name: "",
      address: "",
      tel: "",
      study: ""
    })
  }

  console.log('emp', emp)

  return (
    <>
      <div className="container">
        <div className="form-container">
          <input type="text" name="name" id="name" value={emp?.name || ""} onChange={handInputChange} placeholder="Name" />
          <input type="text" name="address" id="address" value={emp?.address || ""} onChange={handInputChange} placeholder="Address" required />
          <input type="number" name="tel" id="tel" value={emp?.tel || ""} onChange={handInputChange} placeholder="Phone Number" required />


          <select name="study" id="study" onChange={handInputChange} value={emp?.study || ""}>
            <option value=""> Select </option>
            {
              study.map((item, ind) => (
                <option key={ind} value={item.id}> {item.name}</option>
              ))
            }
          </select>


          <select name="subject" onChange={handInputChange} value={emp?.subject || ""}>
            <option value=""> Select Study </option>
            {
              filSub.map((item, ind) => (
                <option key={ind} value={item.id}> {item.name}</option>
              ))
            }
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
                    <td >{item?.name}</td>
                    <td >{item?.address}</td>
                    <td >{item?.tel}</td>
                    <td >{item?.studyName}</td>
                    <td >{item?.subjectName}</td>
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