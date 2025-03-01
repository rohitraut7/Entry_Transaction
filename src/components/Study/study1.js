'use client'
import React, { useState } from 'react';
import '@/app/globals.css';
import axios from 'axios';

const StudySubject = () => {
    const [formdata, setFormdata] = useState({
        id: "",
        name: "",
        address: "",
        tel: "",
        cid: "",
        cname: "",
        sid: "",
        sname: "",
    });
    console.log(formdata);
    

    const [subjectList, setSubjectList] = useState([]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        if (!formdata.sid || !formdata.sname) {
            alert("Please enter Subject Code and Subject Name.");
            return;
        }

        setSubjectList((prev) => [
            ...prev,
            {
                fid: formdata.cid,
                sid: formdata.sid,
                sname: formdata.sname,
            },
        ]);

        setFormdata((prev) => ({
            ...prev,
            sid: "",
            sname: "",
        }));
    };

    const handleSave = async () => {
        try {
            const postdata = {
                id: formdata.id,
                name: formdata.name,
                fosList: subjectList,
            };

            console.log("Saving Data:", postdata);
            // const response = await axios.post("http://localhost:5182/SaveFieldSubjects", postdata);
            // console.log(response.data);
        } catch (error) {
            console.error("Error saving employee:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <input type='text' name='name' value={formdata.name} onChange={handleOnChange} placeholder='Name' />
                <input type='text' name='address' value={formdata.address} onChange={handleOnChange} placeholder='Address' />
                <input type='tel' name='tel' value={formdata.tel} onChange={handleOnChange} placeholder='Tel' />

                <input type='text' name='cid' value={formdata.cid} onChange={handleOnChange} placeholder='Course Code' />
                <input type='text' name='cname' value={formdata.cname} onChange={handleOnChange} placeholder='Course Name' />

                <div className='input-container'>
                    <input type='text' name='sid' value={formdata.sid} onChange={handleOnChange} placeholder='Subject Code' />
                    <input type='text' name='sname' value={formdata.sname} onChange={handleOnChange} placeholder='Subject Name' />

                    <button type='button' onClick={handleAdd}>Add</button>
                </div>

                <div className='table-container'>
                    <h2>Subject List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>COURSE ID</th>
                                <th>SUBJECT ID</th>
                                <th>SUBJECT NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fid}</td>
                                    <td>{item.sid}</td>
                                    <td>{item.sname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button type='button' onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default StudySubject;
