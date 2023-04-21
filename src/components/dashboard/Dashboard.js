import styles from "../styles/Style";
import WebFont from 'webfontloader';
import { useState, useEffect } from "react";
import myImage from '../../image/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPlus, faUserTie, faUser, faRightFromBracket, faClose } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import '../../App.css'
import 'react-datepicker/dist/react-datepicker.css';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { CircularProgressbar } from 'react-circular-progressbar';
import Chart from 'chart.js/auto';
import 'react-circular-progressbar/dist/styles.css';
// import { postRequest } from '../api/api'


const Dashboard = () => {

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
    

    const [chartData, setChartData] = useState({});
    const [chartGenderData, setChartGenderData] = useState({});
    const [countStudents, setCountStudents] = useState(0);
    const [countInstructor, setCountInstructor] = useState(0);
    const [countSubjects, setCountSubjects] = useState(0);
    const [subjectCounts, setSubjectCounts] = useState({
      'Introduction to Computing': '',
      'Computer Programming': '',
      'Data Structure and Algorithm': '',
      'Science Technology and Society': '',
      'Networking I': ''
    });


    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/yearlevel-count/');
        const data = await response.json();
  
        if (data && data.length > 0) {
          const labels = data.map(item => item.yearlevel);
          const counts = data.map(item => item.count);
  
          const chartData = {
            labels: labels,
            datasets: [
              {
                data: counts,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#5DF196'
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#5DF196'
                ]
              }
            ]
          };
  
          setChartData(chartData);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/gender-count/');
        const data = await response.json();
  
        if (data && data.length > 0) {
          const labels = data.map(item => item.gender);
          const counts = data.map(item => item.count);
  
          const chartData = {
            labels: labels,
            datasets: [
              {
                data: counts,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                ]
              }
            ]
          };
  
          setChartGenderData(chartData);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/students/count/');
        const data = await response.json();
        setCountStudents(data.count);
      }
  
      fetchData();
    }, []);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/instructor/count/');
        const data = await response.json();
        setCountInstructor(data.count);
      }
  
      fetchData();
    }, []);
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/subjects/count/');
        const data = await response.json();
        setCountSubjects(data.count);
      }
  
      fetchData();
    }, []);

    
  
    // Chart configuration
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    };
  
    

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

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      doughnutshadow: {
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  }
  

  


    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Poppins', 'Chilanka']
          }
        });
       }, []);

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
          
         
          <div style={styles.rightsidebar}>
            

            <div style={{marginLeft:20, display: 'flex'}}>
                <div className="cards" style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{flex: '1'}}>
                    <h2>STUDENTS</h2>
                    <span style={{fontFamily: 'Poppins', fontSize:20}}>{countStudents}</span>
                  </div>
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={countStudents} 
                    maxValue={50} text={`${countStudents}%`} strokeWidth={10} styles={{path: {stroke: 'blue'}, 
                    text: {fontSize: '22px', fill: '#6f6f6f', fontFamily: 'Poppins'}}} />
                  </div>
                </div>
                <div className="cards2" style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{flex: '1'}}>
                    <h2>SUBJECTS</h2>
                    <span style={{fontFamily: 'Poppins', fontSize:20}}>{countSubjects}</span>
                  </div>
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={countSubjects} 
                    maxValue={50} text={`${countSubjects}%`} strokeWidth={10} styles={{path: {stroke: 'red'}, 
                    text: {fontSize: '22px', fill: '#6f6f6f', fontFamily: 'Poppins'}}} />
                  </div>
                </div>
                
                <div className="cards3" style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex: '1'}}>
                    <h2>INSTRUCTOR</h2>
                    <span style={{fontFamily: 'Poppins', fontSize:20}}>{countInstructor}</span>
                  </div>
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={countInstructor} 
                    maxValue={50} text={`${countInstructor}%`} strokeWidth={10} styles={{path: {stroke: 'green'}, 
                    text: {fontSize: '22px', fill: '#6f6f6f', fontFamily: 'Poppins'}}} />
                  </div>
                </div>
                
            </div>
            <div style={{marginTop:50, display:'flex', justifyContent: 'space-evenly', marginLeft:20}}>
              <div className="doughnut">
                {Object.keys(chartData).length > 0 && (
              <Doughnut data={chartData} options={options2} width={700} height={400}  />)}
              </div>
              <div className="doughnut">
                {Object.keys(chartGenderData).length > 0 && (
                <Doughnut data={chartGenderData} options={options2} width={700} height={400}  />)}
              </div>
            
           
            
          
            </div>

          </div>
          </div>
          </form>
        
        
       
      
        </>
    );
}

export default Dashboard;