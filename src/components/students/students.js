import React from "react";
import styles from "../styles/Style";
import WebFont from 'webfontloader';
import myImage from '../../image/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPlus, faUserTie, faUser, faRightFromBracket, faClose, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import '../../App.css'
import { useState, useEffect } from "react";


const Students = () => {

  const [showModal, setShowModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        suffix: '',
        dateofbirth: '',
        gender: 'M',
        address: '',
        contactnumber: '',
        emailaddress: '',
        lrn: '',
        yearlevel: '1stYear',
        subject: '',
        subjects: [],
        selectedSubjects: [],
        })
        const [students, setStudents] = useState([]);
        const [subjectCounts, setSubjectCounts] = useState({
          'Introduction to Computing': '',
          'Computer Programming': '',
          'Data Structure and Algorithm': '',
          'Science Technology and Society': '',
          'Networking I': ''
        });
        useEffect(() => {
          fetch('/everysubject/count/')
            .then(res => res.json())
            .then(data => {
              const counts = {};
              data.forEach(subject => {
                counts[subject.subjectname] = subject.count;
              });
              setSubjectCounts(counts);
              console.log(data); // check if the data is being fetched correctly
            });      
        }, []);

    useEffect(() => {
        fetch('/students/')  // Replace with the URL of your Django view
          .then(response => response.json())
          .then(data => setStudents(data))
          .catch(error => console.error(error));
      }, []);

    const subjectList = [
        { id: 1, code: 'IT001', name: 'Introduction to Computing', slot: '11/30' },
        { id: 2, code: 'IT002', name: 'Computer Programming', slot: '2/30' },
        { id: 3, code: 'IT003', name: 'Data Structure and Algorithm', slot: '23/30' },
        { id: 4, code: 'IT004', name: 'Science Technology and Society', slot: '14/30' },
        { id: 5, code: 'IT005', name: 'Networking I', slot: '8/30' },
      ];
  
  
    const handleFormChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('students/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            suffix: formData.suffix,
            dateofbirth: formData.dateofbirth,
            gender: formData.gender,
            address: formData.address,
            contactnumber: formData.contactnumber,
            emailaddress: formData.emailaddress,
            lrn: formData.lrn,
            yearlevel: formData.yearlevel,
            subjects: formData.subjects,  // array of subject ids
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            // do something after successful POST
          })
          .catch((error) => {
            console.error('Error:', error);
            // handle error
          });
      };
      
      
      const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        if (name === 'subjects') {
          let updatedSubjects = [...formData.subjects];
      
          if (event.target.checked) {
            updatedSubjects.push(Number(value));
      
            // Get the subject name and add it to selectedSubjects
            const selectedSubject = subjectList.find((subject) => subject.id === Number(value));
            const updatedSelectedSubjects = [...formData.selectedSubjects, selectedSubject.name];
            setFormData((prevState) => ({
              ...prevState,
              selectedSubjects: updatedSelectedSubjects,
            }));
          } else {
            updatedSubjects = updatedSubjects.filter((subjectId) => subjectId !== Number(value));
      
            // Remove the subject name from selectedSubjects
            const updatedSelectedSubjects = formData.selectedSubjects.filter((subjectName) => {
              const subject = subjectList.find((subject) => subject.name === subjectName);
              return subject && subject.id !== Number(value);
            });
            setFormData((prevState) => ({
              ...prevState,
              selectedSubjects: updatedSelectedSubjects,
            }));
          }
      
          setFormData((prevState) => ({
            ...prevState,
            subjects: updatedSubjects,
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      };
  
      const selectedSubjects = formData.selectedSubjects.join(', ');
  
      useEffect(() => {
          WebFont.load({
            google: {
              families: ['Poppins', 'Chilanka']
            }
          });
         }, []);
        
          const handleDelete = (id) => {
            fetch(`/students/${id}/`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(response => {
              if (response.ok) {
                // Remove the deleted student from the state
                setStudents(students.filter(student => student.id !== id));
              } else {
                throw new Error('Failed to delete student.');
              }
            })
            .catch(error => {
              console.error(error);
            });
          };

         return (
            <>
            <form onSubmit={handleSubmit} action="/api/enrollment/" method="POST">
            <div>
          <div style={styles.leftsidebar}>
            <div style={styles.leftsidebarlogo}>
            <img style={{height: 250, width:200, }} src={myImage} alt="My Image"/>
            <button onClick={() => setShowModal(true)} style={styles.registerstudent}>Register Student<FontAwesomeIcon style={{marginLeft: 10, color: 'white'}} icon={faPlus} /></button>
            <div className={`modal ${showModal ? 'modal-open' : 'modal-close'}`}>
            <div className="modal-content">
              <FontAwesomeIcon className="close" style={{width: 35, height:35}} icon={faClose} onClick={() => setShowModal(false)} />
              <div className="titlename" style={{textAlign: 'left'}}><h1>Name</h1></div>
              <div className="input-row">
              <div className="input-col">
                <h2>First Name</h2>
                <input type="text" value={formData.firstname} name="firstname" onChange={handleFormChange} />
              </div>
              <div className="input-col">
                <h2>Middle Name</h2>
                <input type="text" value={formData.middlename} name="middlename" onChange={handleFormChange} />
              </div>
              <div className="input-col">
                <h2>Last Name</h2>
                <input type="text" value={formData.lastname} name="lastname" onChange={handleFormChange} />
              </div>
              <div className="input-col">
                <h2>Suffix</h2>
                <input type="text" value={formData.suffix} name="suffix" onChange={handleFormChange} />
              </div>
              
            </div>
            <div className="titlename" style={{textAlign: 'left', marginTop: 20}}><h1>Personal Information</h1></div>
            <div className="input-row">
              <div className="input-col">
                <h2>Date of Birth</h2>
                  <input type="date" name="dateofbirth" onChange={handleFormChange} />
              </div>
              <div className="input-col">
                <h2>Gender</h2>
                <select name="gender" id="dropdown" value={formData.gender} onChange={handleFormChange}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="input-col">
                <h2>Address</h2>
                <input type="text" name="address" onChange={handleFormChange} value={formData.address} />
              </div>
              <div className="input-col">
                <h2>Contact Number</h2>
                <input type="number" name="contactnumber" onChange={handleFormChange} value={formData.contactnumber}/>
              </div>
              
            </div>
            <div className="titlename" style={{textAlign: 'left', marginTop: 20}}><h1>Other Information</h1></div>
            <div className="input-row">
              <div className="input-col">
                <h2>Email Address</h2>
                <input name="emailaddress" onChange={handleFormChange} type="email" value={formData.emailaddress} />
              </div>
              <div className="input-col">
                <h2>LRN</h2>
                <input name="lrn" onChange={handleFormChange} type="number" value={formData.lrn} />
              </div>
              <div className="input-col">
                <h2>Year Level</h2>
                <select name="yearlevel" id="dropdown" value={formData.yearlevel} onChange={handleFormChange}>
                  <option value="1stYear">1st Year</option>
                  <option value="2ndYear">2nd Year</option>
                  <option value="3rdYear">3rd Year</option>
                  <option value="4thYear">4th Year</option>
                </select>
              </div>
              <div className="input-col">
                <h2>Subjects</h2>
                <input value={selectedSubjects} id="row.id"  type="text" onClick={() => setShowSubjectModal(true)} />
                <div className={`modal ${showSubjectModal ? 'modal-open' : 'modal-close'}`}>
                  <div className="modal-content">
                  <FontAwesomeIcon className="close" style={{width: 35, height:35}} icon={faClose} onClick={() => setShowSubjectModal(false)} />
                  <div>
                    <h1 style={{textAlign:'center', fontFamily: 'Poppins'}}>RECOMMENDED SUBJECTS</h1>
                    <table className="my-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Code</th>
                          <th>Subject</th>
                          <th>Slot</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectList.map((subject) => (
                          <tr key={subject.id}>
                            <td style={{ justifyContent: 'center', display: 'flex' }}>
                              <label className="checkbox-label">
                                <input
                                  value={subject.id}
                                  name="subjects"
                                  type="checkbox"
                                  checked={formData.subjects.includes(subject.id)}
                                  onChange={handleInputChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </td>
                            <td>{subject.code}</td>
                            <td>{subject.name}</td>
                            <td>{subjectCounts[subject.name] ? subjectCounts[subject.name] : 0}/30</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                  </div> 
                </div>
              </div>
              
            </div>


              <div className="button-container">
              <button type="submit" onClick={handleSubmit} className="registerbutton">Register</button>
              </div>
              
                
                </div>
            
                
            </div>
            </div>
            <div style={styles.list}>
              <ul className="list">
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faChartLine} /> <a href="/dashboard" className="sidebar-text">Dashboard</a></li>
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faBook} /><a href="/subjects" className="sidebar-text"> Subjects</a></li>
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faUser} /><a href="/students" className="sidebar-text"> Student</a></li>
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faUserTie} /><a href="/instructor" className="sidebar-text"> Instructor</a></li>
                <li className="sidebar-item" style={{marginTop: 50}}> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faRightFromBracket} /><a href="/" className="sidebar-text">Logout</a></li>
              </ul>
            </div>
            </div>
                <div style={styles.subjectrightsidebar}>
                <div style={{alignSelf:'center', justifySelf:'center',display:'flex', marginTop:'5%', marginLeft:'7%', marginRight:'5%'}}>
                    <table className="my-table2">
                        <thead>
                            <tr>
                            <th>LRN</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Year Level</th>
                            <th>Email Address</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.lrn}</td>
                                <td>{student.firstname} {student.lastname}</td>
                                <td>{student.dateofbirth}</td>
                                <td>{student.gender}</td>
                                <td>{student.yearlevel}</td>
                                <td>{student.emailaddress}</td>
                                <td style={{textAlign:'center'}}><FontAwesomeIcon className="sidebar-icon" style={{color: 'red', width:25, height:25, cursor:'pointer'}} icon={faSquareMinus} onClick={() => handleDelete(student.id)} /></td>
                            </tr>
        ))}
                        </tbody>
                        </table>
                    </div>

                </div>
            </div>


            </form>

            </>
         )
}

export default Students;