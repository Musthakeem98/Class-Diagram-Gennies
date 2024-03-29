"use client";
import "@/styles/register.css";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function Register() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlertEnable, setAlertEnable] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type == "name") {
      setName(event.target.value);
    } else if (type == "email") {
      setEmail(event.target.value);
    } else if (type == "username") {
      setUserName(event.target.value);
    } else if (type == "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !userName || !password) {
      setAlertMsg("Please fill in all fields.");
      setAlertEnable(true);
    } else if (password.length < 8) {
      setAlertMsg("Password must be at least 8 characters long.");
      setAlertEnable(true);
    } else {
      const responce = sendPostReq();
    }
  };

  const sendPostReq = async () => {
    try {
      const response = await axios.post(`http://localhost:3005/adduser`, {
        name: name,
        email: email,
        username: userName,
        password: password,
      });
      console.log("Data posted successfully:", response.data);
      setName("");
      setEmail("");
      setUserName("");
      setPassword("");
      setAlertMsg("");
      setAlertEnable(false);
      setAlertMsg("Successfuly login");
      setSuccess(true);
      enqueueSnackbar("🚀 User Register Successfuly", {
        autoHideDuration: 2000,
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return response.data; // Optionally, return the data received from the server
    } catch (error) {
      console.error("Error posting data:", error);
      throw error; // Optionally, rethrow the error to handle it outside
    }
  };

  return (
    <SnackbarProvider>
      <div>
        <div className="logincontainer">
          <div className="piccontainer">
            <a href="/" className="logoLink">
              <img className="logoimage" src="/images/logo.png" alt="logo" />
            </a>
            <div className="loginbody">
              <img
                className="loginimg"
                src="/images/stockpic.png"
                alt="loginpage image"
              />
            </div>
          </div>
          <div className="loginform">
            <p className="forumhadding">Welcome to Diagram Genius !</p>
            <p className="headmsg">Register your account</p>
            <p className="forumvalue">Name</p>
            <input
              type="text"
              className="input-box"
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
            />
            <div className="mb-10"></div>
            <p className="forumvalue">Email</p>
            <input
              type="email"
              className="input-box"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
            />
            <div className="mb-10"></div>
            <p className="forumvalue">User Name</p>
            <input
              type="text"
              className="input-box"
              value={userName}
              onChange={(e) => handleInputChange(e, "username")}
            />
            <div className="pb-10"></div>
            <p className="forumvalue">Password</p>
            <input
              type="password"
              className="input-box"
              value={password}
              onChange={(e) => handleInputChange(e, "password")}
            />
            {isAlertEnable && (
              <div className="pt-10">
                <Alert severity="error" style={{ width: "90%" }}>
                  {alertMsg}
                </Alert>
              </div>
            )}
            <div className="Signupbutton">
              <button className="regsiterbutton" onClick={() => handleSubmit()}>
                Sign Up
              </button>
            </div>
            <div className="center">
              <div className="left-content">
                <p className="noaccount">
                  Already have a Diagram Genius Account?{" "}
                </p>
                <a className="siginlink" href="/login">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
