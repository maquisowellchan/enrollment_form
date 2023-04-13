import styles from "../styles/Style";
import WebFont from 'webfontloader';
import { useState, useEffect } from "react";
import myImage from '../../image/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPlus, faUserTie, faUser, faRightFromBracket, faClose } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import '../../App.css'
import 'react-datepicker/dist/react-datepicker.css';
// import { postRequest } from '../api/api'


const Dashboard = () =>{

  const [showModal, setShowModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({
      firstname: '',
      middlename: '',
      lastname: '',
      suffix: '',
      dateofbirth: '',
      gender: 'Male',
      address: '',
      contactnumber: '',
      emailaddress: '',
      lrn: '',
      yearlevel: '1st Year',
      subject: '',
      subjects: [],
    })

  const subjectstochoose = [
    { id: 1, code: 'IT001', subject: 'Introduction to Computing', slot: '6/30' },
    { id: 2,code: 'IT002', subject: 'Computer Programming', slot: '3/30' },
    { id: 3,code: 'IT003', subject: 'Data Structure and Algorithm', slot: '2/30' },
    { id: 4,code: 'IT004', subject: 'Science Technology and Society', slot: '2/30' },
    { id: 5,code: 'IT005', subject: 'Networking I', slot: '2/30' },
  ];

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataList = { ...formData, subjects: [formData.subjects] };

    fetch('/api/enrollment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataList),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleChange = (event) => {
    setSelectedGender(event.target.value);

  };
  const handleChangeYearLevel = (event) => {
    setSelectedYearLevel(event.target.value);

  };
  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    

    if (event.target.checked) {
      setFormData({ ...formData, subjects: [...formData.subjects, event.target.value] });
    } else {
      setFormData({ ...formData, subjects: formData.subjects.filter(subject => subject !== event.target.value) });
    }
    const rowId = parseInt(event.target.id);
    const row = subjectstochoose.find(row => row.id === rowId);
    if (row) {
      if (event.target.checked) {
        setSelectedRows([...selectedRows, row]);
      } else {
        setSelectedRows(selectedRows.filter(r => r.id !== rowId));
      }
    }
  };

  const selectedSubjects = selectedRows.map(row => row.subject).join(', ');

  


    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Poppins', 'Chilanka']
          }
        });
       }, []);
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
              <div className="input-col">
                <h2>Subjects</h2>
                <input id="row.id"  type="text" onClick={() => setShowSubjectModal(true)} />
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
                          <th>Subjects</th>
                          <th>Slot</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectstochoose.map(row => (
                          <tr key={row.id}>
                            <td style={{justifyContent:'center', display:'flex'}}> 
                              <label className="checkbox-label">
                              <input value={row.id} name='subjects' type="checkbox" id={row.id} checked={formData.subjects.includes(row.id)} onChange={(event) => {
                              const subjectId = parseInt(event.target.value);
                              if(event.target.checked){
                                setFormData({...formData, subjects: [...formData.subjects, subjectId]});
                              } else {
                                setFormData({...formData, subjects: formData.subjects.filter(subject => subject !== subjectId)});
                              }
                              }}  />
                              <span className="checkmark"></span>
                              </label> </td>  
                            <td>{row.code}</td>
                            <td>{row.subject}</td>
                            <td>{row.slot}</td>
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
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faChartLine} /> <a href="#" className="sidebar-text">Dashboard</a></li>
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faBook} /><a href="#" className="sidebar-text"> Subjects</a></li>
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faUser} /><a href="#" className="sidebar-text"> Student</a></li>
                <li className="sidebar-item"> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faUserTie} /><a href="#" className="sidebar-text"> Instructor</a></li>
                <li className="sidebar-item" style={{marginTop: 50}}> <FontAwesomeIcon className="sidebar-icon" style={{color: '#6f6f6f', width:25, height:25}} icon={faRightFromBracket} /><a href="/" className="sidebar-text">Logout</a></li>
              </ul>
            </div>
          
          </div>
          
         
          <div style={styles.rightsidebar}>

          </div>
          </div>
          </form>
        
        
       
      
        </>
    );
}

export default Dashboard;