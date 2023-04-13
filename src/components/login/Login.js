import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from "../styles/Style";
import { useState, useEffect } from "react";
import WebFont from 'webfontloader';
import myImage from '../../image/logo.png'
import background from '../../image/bg3.jpg'
import React from "react";
import '../../App.css'




const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

 
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
    width: 1700,
    height: 810,
    marginTop: '-1%'
  
    
    
  };


  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins', 'Chilanka']
      }
    });
   }, []);

   

  return (
    <>
    <div style={backgroundStyle}>
      <div>
        <div style={styles.logincontainer}>
          <div style={styles.leftcontainer}>
          <div style={{flexDirection: 'row', justifyContent: 'flex-start', display: 'flex', height: 100, width: 500}}>
            <img style={{height: 125, width:100, marginLeft: '5%'}} src={myImage} alt="My Image"/>
            <h1 style={{fontFamily: 'Poppins', fontSize: 25, marginTop: '13%', color: '#6f6f6f'}}>JIM LAO COLLEGE</h1>
            
          </div>
          <div style={{flexDirection:'column', display: 'flex',  marginTop: '11%', height: 200}}>
            <h1 style={{fontFamily:'Poppins', fontWeight:'bold', fontSize:20, marginLeft: '5%', color: '#6f6f6f'}}>LOGIN</h1>
            <h1 style={{fontFamily:'Poppins', fontWeight:'bold', fontSize:16, marginLeft: '5%', color: '#6f6f6f'}}>Login to continue to our Enrollment application</h1>
          </div>
          <div style={{marginTop:'-14%', justifyContent: 'center', alignItems: 'center', width: 500, marginLeft: '5%'}}>
              <input  type='text' placeholder= "Username" 
              
              style={{borderBottom: isFocused ? '2px solid #56c8ed' : '2px solid #6f6f6f', 
              borderBottomWidth: '2px',
              paddingTop: 10,
              paddingBottom: 5,
              outline: 'none',
              fontSize: 16,
              width: 400,
              marginTop: '3%',
              borderWidth: 0,
              fontFamily: 'Poppins',
              fontWeight: 'light' }} 
              onFocus={handleFocus}
              onBlur={handleBlur}/>

              <input type='text' placeholder= "Password" 
              
              style={{borderBottom: isFocused2 ? '2px solid #56c8ed' : '2px solid #6f6f6f', 
              borderBottomWidth: '2px',
              paddingTop: 10,
              paddingBottom: 5,
              outline: 'none',
              fontSize: 16,
              width: 400,
              marginTop: '3%',
              borderWidth: 0,
              fontFamily: 'Poppins',
              fontWeight: 'light' }} 
              onFocus={handleFocus2}
              onBlur={handleBlur2}/>

          </div>
            <div style={{marginTop: '5%', marginLeft: '5%'}}>
              <button className="buttonni" style={styles.loginbutton}><Link style={{textDecoration: 'none', color:'white'}} to="dashboard">Login</Link></button>
              
            </div>
          </div>
          <div className="rightcontainer" style={styles.rightcontainer}>

          </div>
          
        </div>
      </div>
      </div>
    </>
  )
};

export default Login;