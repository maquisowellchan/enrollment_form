import React, { useState, useEffect } from 'react';

function StudentUpdateForm(props) {
    const [name, setName] = useState({ firstName: props.student.firstname, lastName: props.student.lastname });
  const [dateOfBirth, setDateOfBirth] = useState(props.student.dateofbirth);
  const [gender, setGender] = useState(props.student.gender);
  const [yearLevel, setYearLevel] = useState(props.student.yearlevel);
  const [lrn, setLRN] = useState(props.student.lrn);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      name,
      date_of_birth: dateOfBirth,
      gender,
      yearlevel: yearLevel,
      lrn,
    });
  };

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={`${name.firstName} ${name.lastName}`} onChange={(event) => setName({ ...name, firstName: event.target.value })} />
      <label htmlFor="dateOfBirth">Date of Birth</label>
      <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
      <label htmlFor="gender">Gender</label>
      <select id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <label htmlFor="yearLevel">Year Level</label>
      <select id="yearlevel" value={yearLevel} onChange={(event) => setYearLevel(event.target.value)}>
        <option value="1stYear">1st Year</option>
        <option value="2ndYear">2nd Year</option>
        <option value="3rdYear">3rd Year</option>
        <option value="4thYear">4th Year</option>
      </select>
      <label htmlFor="lrn">LRN</label>
      <input type="text" id="lrn" value={lrn} onChange={(event) => setLRN(event.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default StudentUpdateForm;
