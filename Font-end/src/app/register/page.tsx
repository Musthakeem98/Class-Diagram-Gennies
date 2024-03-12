"use client"
import "@/styles/register.css"
import { useState } from "react";
import Alert from '@mui/material/Alert';

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [isAlertEnable, setAlertEnable] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if(type == 'name'){
      setName(event.target.value);
    }
    else if(type == 'email'){
      setEmail(event.target.value)
    }else if(type == 'username'){
      setUserName(event.target.value)
    }else if(type == 'password'){
      setPassword(event.target.value)
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !userName || !password) {
      setAlertMsg('Please fill in all fields.');
      setAlertEnable(true);
    } else if (password.length < 8) {
      setAlertMsg('Password must be at least 8 characters long.');
      setAlertEnable(true);
    } else {
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);
      console.log("username", userName);

      setName('');
      setEmail('');
      setUserName('');
      setPassword('');
      setAlertMsg('');
      setAlertEnable(false);
    }
  };

  return (
    <div>
      <div className="logincontainer">
       <div className="piccontainer">
       <a href="/" className="logoLink"> 
            <img className="logoimage" src="/images/logo.png" alt="logo" />
          </a>
          <div className="loginbody">
          <img className="loginimg" src="/images/stockpic.png" alt="loginpage image" />
        </div>
        </div>
        <div className="loginform">
        <p className="forumhadding">Welcome to Diagram Genius !</p>
        <p className="headmsg">Register your account</p>
        <p className="forumvalue">Name</p>
        <input type="text" className="input-box" value={name} onChange={(e) => handleInputChange(e,"name")} />
        <div className="mb-10"></div>
        <p className="forumvalue">Email</p>
        <input type="email" className="input-box" value={email} onChange={(e) => handleInputChange(e,"email")}/>
        <div className="mb-10"></div>
        <p className="forumvalue">User Name</p>
        <input type="text" className="input-box" value={userName} onChange={(e) => handleInputChange(e,"username")}/>
        <div className="pb-10"></div>
        <p className="forumvalue">Password</p>
        <input type="password" className="input-box" value={password} onChange={(e) => handleInputChange(e,"password")}/>
        <div className="pb-10"></div>
        {isAlertEnable && (<Alert severity="error" style={{width:"90%"}}>
          {alertMsg}
          </Alert>)}
        <div className="Signupbutton">
        <button className="regsiterbutton" onClick={()=>handleSubmit()}>Sign Up</button>
        </div>
        <div className="center">
          <div className="left-content">
            <p className="noaccount">Already have a Diagram Genius Account? </p>
            <a className="siginlink" href="/login">Sign In</a>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}