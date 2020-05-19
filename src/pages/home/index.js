import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "services";

function Home() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // useEffect(() => {
  //   setEmailErr(undefined);
  //   setPasswordErr(undefined);
  // }, [email, password]);

  async function handleLoginClick() {
    if (email.length === 0) return setEmailErr("Email is required");
    if (!email) return setEmailErr("Email must be valid!");
    if (password.length === 0) return setPasswordErr("Password is required");

    setIsLoggingIn(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/user/username");
    } catch (err) {
      setFirebaseErr(err.message);
      setIsLoggingIn(false);
    }
  }

  function handleAdminClick() {
    history.push("/admin");
  }

  function handleEmailInput(event) {
    setEmail(event.target.value);
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }

  return (
    <div>
      <h1>Home Page</h1>
      <input
        id="email"
        errMessage={emailErr}
        label="* Email"
        type="email"
        placeholder="email"
        onChange={handleEmailInput}
        value={email}
      />
      {emailErr}
      <input
        id="password"
        errMessage={passwordErr}
        label="* Password"
        type="password"
        placeholder="password"
        onChange={handlePasswordInput}
        value={password}
      />
      {passwordErr}
      {firebaseErr}
      <button disabled={isLoggingIn} onClick={handleLoginClick}>
        Log{isLoggingIn ? "ging" : ""}in
      </button>
      <button onClick={handleAdminClick}> Admin Login</button>
    </div>
  );
}

export default Home;
