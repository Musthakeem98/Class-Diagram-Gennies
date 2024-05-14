"use client";
import "@/styles/login.css";
import { SetStateAction, useState } from "react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlertEnable, setAlertEnable] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const router = useRouter();

  const handleUserNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (!userName || !password) {
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
      const response = await axios.post("http://localhost:3005/login", {
        username: userName,
        password: password,
      });

      // Assuming these state setters are defined using useState hook
      setUserName("");
      setPassword("");
      setAlertMsg("");
      setAlertEnable(false);
      setAlertMsg("Successfully logged in");
      setSuccess(true);

      // Assuming you're using some kind of notification system (like snackbar) to show success message
      enqueueSnackbar("🚀 Successfully logged in", {
        autoHideDuration: 2000,
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      setTimeout(() => {
        router.push("/"); // Assuming you have access to router object
      }, 2000);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 300) {
        // Handle user not found error
        setAlertMsg("User not found");
        setAlertEnable(true);
      }
      if (error.response && error.response.status === 401) {
        // Handle user not found error
        setAlertMsg("Invalid username or password");
        setAlertEnable(true);
      } else {
        // Handle other errors
        console.error("Error posting data:", error);
        // Optionally, you can rethrow the error to handle it outside
        throw error;
      }
    }
  };
  return (
    <SnackbarProvider>
      <div>
        <div className="logincontainer">
          <div className="piccontainer">
            <a href="/" className="logoLink">
              {" "}
              {/* Link to the home page */}
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
            <p className="forumhadding">Log into Diagram Genius</p>
            <p className="forumvalue">User Name</p>
            <input
              type="text"
              className="input-box"
              value={userName}
              onChange={handleUserNameChange}
            />
            <div className="pb-20"></div>
            <div className="password">
              <p className="forumvalue">Password</p>
              <a className="forgotPassword" href="">
                Forgot Password
              </a>
            </div>
            <input
              type="password"
              className="input-box"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="pb-20"></div>
            <div className="remember">
              <div className="left-content">
                <input
                  className="box"
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                />
                <label className="checkboxlable" htmlFor="rememberMe">
                  Remember me for 30 days
                </label>
              </div>
            </div>
            {isAlertEnable && (
              <Alert severity="error" style={{ width: "90%" }}>
                {alertMsg}
              </Alert>
            )}
            <div className="mb-10"></div>
            <div className="center">
              <button className="loginbutton" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="center">
              <div className="left-content">
                <p className="noaccount">
                  Don’t have a Diagram Genius Account?{" "}
                </p>
                <a className="siginlink" href="/register">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
