'use client'
import React, { useState } from 'react';
import axios from 'axios';
import "@/app/globals.css"

const StudySubject = () => {

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        sid: "",
        sname: ""
    })

    const [subjectList, setSubjectList] = useState([]);

    const handleonchange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSavestudy = async () => {
        try {

            var postData = {
                id: formData?.id,
                name: formData?.name,
                fosList: subjectList
            };

            const response = await axios.post("http://localhost:5182/SaveFieldSubjects", postData);
            alert(response.data);

            setSubjectList([]);
            // console.log("Employee Saved:", response.data);

        } catch (error) {
            console.error("Error saving employee:", error.response ? error.response.data : error.message);
        }
    };

    const handleAdd = () => {
        setSubjectList((pv) => [...pv,
        {
            fid: formData.id,
            sid: formData.sid,
            sname: formData.sname
        }
        ])

        setFormData((prev) => ({
            ...prev,
            sid: "",
            sname: ""
        }));


    }








    return (
        <>
            <div className='container'>
                <div className='form-container'>
                    <input type='text' name='id' value={formData?.id} onChange={handleonchange} placeholder='Course Code' />
                    <input type='text' name='name' value={formData?.name} onChange={handleonchange} placeholder='Course Name' />
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Subject Code"
                            name='sid'
                            value={formData?.sid}
                            onChange={handleonchange}
                            className="input-box"
                        />
                        <input
                            type="text"
                            placeholder="Subject Name"
                            name='sname'
                            value={formData?.sname}
                            onChange={handleonchange}
                            className="input-box"
                        />
                        <button type='button' onClick={handleAdd} >
                            Add</button>
                    </div>

                    <div className='table-container'>
                        <h2>Subject List</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course Code</th>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    subjectList?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.fid}</td>
                                            <td>{item?.sid}</td>
                                            <td>{item?.sname}</td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    <button type="button" onClick={handleSavestudy}>
                        Save
                    </button>


                </div>

            </div>

        </>
    );
};

export default StudySubject;













