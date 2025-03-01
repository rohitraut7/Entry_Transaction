'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "@/app/styles/global.css";
import { v4 as uuid } from "uuid";

const Employee = () => {
  const [field, setField] = useState([]);
  const [filSub, setFilSub] = useState([]);
  const [emplist, setEmplist] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const generateIntegerFromUUID = () => {
    const unique_id = uuid();
    const numbersOnly = unique_id.replace(/\D/g, ''); // Remove non-digits
    return parseInt(numbersOnly.substring(0, 3), 10); // Take first 3 digits as an integer
  };


  const [emp, setEmp] = useState({
    id: "",
    name: "",
    address: "",
    tel: "",
    field: "",
    field_name: "",
    sub: "",
    sub_name: ""
  });

  useEffect(() => {
    const getFieldOfStudy = async () => {
      try {
        const response = await axios.get("http://localhost:5182/getFieldofstudylist");
        setField(response.data);
      } catch (error) {
        alert("Error fetching fields: " + (error.response?.data || error.message));
      }
    };
    getFieldOfStudy();
  }, []);

  useEffect(() => {
    if (!emp.field) return;
    const getFieldOfSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:5182/getSubjectbyCourseId?courseid=${emp.field}`);
        setFilSub(response.data);
      } catch (error) {
        alert("Error fetching subjects: " + (error.response?.data || error.message));
      }
    };
    getFieldOfSubject();
  }, [emp.field]);



  const handleonchange = (e) => {
    const { name, value } = e.target;

    setEmp((prev) => {
      let updatedEmp = { ...prev, [name]: value };

      if (name === "field") {
        const selectedField = field.find((item) => item.id === Number(value));
        updatedEmp = { ...updatedEmp, field_name: selectedField ? selectedField.name : "", sub: "", sub_name: "" };
      }

      if (name === "sub") {
        const selectedSub = filSub.find((item) => item.sid === Number(value));
        updatedEmp = { ...updatedEmp, sub_name: selectedSub ? selectedSub.sname : "" };
      }

      return updatedEmp;
    });
  };

  const AddEmp = () => {
    if (!emp.name || !emp.address || !emp.tel || !emp.field || !emp.sub) {
      alert("Please fill all fields before adding.");
      return;
    }

    if (editIndex !== null) {
      setEmplist((prev) => prev.map((item, index) => (index === editIndex ? emp : item)));
      setEditIndex(null);
    } else {
      setEmplist((prev) => [...prev, { ...emp, id: uuid() }]);
    }

    setEmp((prev) => ({
      ...prev,
      field: "",
      field_name: "",
      sub: "",
      sub_name: ""
    }));
  };

  const handleEditEmp = (index) => {
    setEditIndex(index);


    setEmp((prev) => ({
      ...prev,
      field: emplist[index]?.field,
      field_name: emplist[index]?.field_name,
      sub: emplist[index]?.sub,
      sub_name: emplist[index]?.sub_name
    }));

  };

  const handleDelEmp = (index) => {
    setEmplist((prev) => prev.filter((_, ind) => ind !== index));
  };



  const handleSavestudy = async () => {
    try {
      const postData = {
        id: generateIntegerFromUUID(),
        name: emp.name,
        address: emp.address,
        Tel: emp.tel,
        sub: emplist.map((item) => {
          return {
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





  // Function to handle searching employee by name
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!emp.id) {
      alert("Please enter a name to search.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5182/getStudentInfoByStudentId?sid=${emp.id}`);
      console.log('res', response);

      setEmp({
        id: response.data?.id || "",
        name: response.data?.name || "",
        address: response.data?.address || "",
        tel: response.data?.tel || ""
      })

      setEmplist(response.data?.sub || []);

    } catch (error) {
      alert("Error fetching search results: " + (error.response?.data || error.message));
    }
  };



  console.log('emp', emp);
  console.log('emplist', emplist);

  return (
    <div className='container'>
      <div className='form-container' style={{ position: "relative" }}>
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ position: "absolute", top: 0, right: 0, display: "flex", gap: "10px" }}>
          <input
            type="text"
            name="id"
            placeholder="Search by Name"
            value={emp.id}
            onChange={handleonchange}
          />
          <button type="submit">Search</button>
        </form>

       
        <input type='text' style={{ "margin-top": "40px" }} name='name' value={emp.name} onChange={handleonchange} placeholder='Name' />
        <input type='text' name='address' value={emp.address} onChange={handleonchange} placeholder='Address' />
        <input type='tel' name='tel' value={emp.tel} onChange={handleonchange} placeholder='Tel' />

        {/* Field Dropdown */}
        <select name='field' onChange={handleonchange} value={emp.field || ""}>
          <option value="">Select Field</option>
          {field.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        {/* Subject Dropdown */}
        <select name='sub' onChange={handleonchange} value={emp.sub || ""}>
          <option value="">Select Subject</option>
          {filSub.map((item) => (
            <option key={item.sid} value={item.sid}>{item.sname}</option>
          ))}
        </select>

        <button type='button' onClick={AddEmp}>{editIndex !== null ? "Update" : "Add"}</button>

        {/* Table to Display Employees */}
        {emplist.length > 0 && (
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

                    <td>{item.field_name}</td>
                    <td>{item.sub_name}</td>
                    <td>
                      <button onClick={() => handleEditEmp(index)}>Edit</button>
                      <button onClick={() => handleDelEmp(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <button type="button" onClick={handleSavestudy}>Save</button> */}
            <button type='button' onClick={handleSavestudy}>{editIndex !== null ? "Update" : "Save"}</button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;




