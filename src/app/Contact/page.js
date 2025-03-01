'use client'

import { useState } from "react";
import "@/app/globals.css"; // Import the CSS file

export default function Home() {

  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    fieldOfStudy: "",
    subject: "",
    marks: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editMarks, setEditMarks] = useState("");

  const fields = {
    Science: ["Physics", "Chemistry", "Biology"],
    Commerce: ["Accounting", "Business Studies", "Economics"],
    Arts: ["History", "Literature", "Philosophy"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "fieldOfStudy" ? { subject: "", marks: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData((prev) => [...prev, formData]);
    setFormData({ name: "", address: "", phone: "", fieldOfStudy: "", subject: "", marks: "" });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditMarks(submittedData[index].marks);
  };

  const handleSaveClick = (index) => {
    const updatedData = [...submittedData];
    updatedData[index].marks = editMarks;
    setSubmittedData(updatedData);
    setEditIndex(null);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Student Form</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
          
          <select name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} required>
            <option value="">Select Field of Study</option>
            {Object.keys(fields).map((field) => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
          
          {formData.fieldOfStudy && (
            <select name="subject" value={formData.subject} onChange={handleChange} required>
              <option value="">Select Subject</option>
              {fields[formData.fieldOfStudy].map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          )}
          
          {formData.subject && (
            <input type="number" name="marks" value={formData.marks} onChange={handleChange} placeholder="Marks" required />
          )}
          
          <button type="submit">Submit</button>
        </form>
      </div>

      {submittedData.length > 0 && (
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
                <th>Marks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.address}</td>
                  <td>{data.phone}</td>
                  <td>{data.fieldOfStudy}</td>
                  <td>{data.subject}</td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editMarks}
                        onChange={(e) => setEditMarks(e.target.value)}
                        className="edit-input"
                      />
                    ) : (
                      data.marks
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <button className="save-btn" onClick={() => handleSaveClick(index)}>Save</button>
                    ) : (
                      <button className="edit-btn" onClick={() => handleEditClick(index)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
