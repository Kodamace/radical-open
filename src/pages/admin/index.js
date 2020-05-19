import React, { useState } from "react";

import { db, auth } from "services";

import { CardShape, Checker, Container, Row } from "styles";

import { useHistory } from "react-router-dom";

function Admin() {
  const [card, setCard] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [points, setPoints] = useState(0);
  const [loyalty, setLoyalty] = useState(0);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState();
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState();
  const [firebaseErr, setFirebaseErr] = useState();
  const [isSigningUp, setIsSigningUp] = useState(false);

  async function handleSignup() {
    if (email.length === 0) return setEmailErr("Email is required!");
    // if (!validateEmail(email)) return setEmailErr('Email must be valid!')
    if (password.length === 0) return setPasswordErr("Password is required!");
    if (password.length < 6)
      return setPasswordErr("Password must be at least 6 characters long!");
    if (confirmPassword.length === 0)
      return setConfirmPasswordErr("Confirm Password is required!");
    if (password !== confirmPassword) {
      setPasswordErr("Passwords must match!");
      return setConfirmPasswordErr("Passwords must match!");
    }

    setIsSigningUp(true);

    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response.user) throw new Error("Something went wrong!");

      await db
        .collection("cardholders")
        .doc(response.user.uid)
        .set({
          name: name,
          emailName: response.user.email?.split("@")[0] ?? "<UNKNOWN>",
          card: ["", "", "", "", "", "", "", "", "", ""],
          points: 0,
          loyalty: 0,
        });
    } catch (ex) {
      setFirebaseErr(ex.message);
    } finally {
      setIsSigningUp(false);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  // function addNew() {

  //   db.collection("cardholders")
  //     .add({
  //       card: ["", "", "", "", "", "", "", "", "", ""],
  //       points: 0,
  //       name: "megs",
  //       loyalty: 0,
  //     })
  //     .then(function (docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });
  // }

  // db.collection("cardholders")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   });

  // function handleClick(index) {
  //   const newCard = [...card];
  //   if (newCard[index] === "") {
  //     newCard[index] = "X";
  //     setCard(newCard);
  //     setPoints(points + 1);
  //   }
  //   if (points === 9) setLoyalty(loyalty + 1);
  // }

  // function handleRedeem() {
  //   const clearCard = ["", "", "", "", "", "", "", "", "", ""];
  //   if (window.confirm("Redeem free coffee")) {
  //     if (points === 10) {
  //       setCard(clearCard);
  //       setPoints(0);
  //       setLoyalty(loyalty - 1);
  //     }
  //     if (loyalty > 0) setLoyalty(loyalty - 1);
  //   }
  // }

  // function handleStoreLoyalty() {
  //   const clearCard = ["", "", "", "", "", "", "", "", "", ""];
  //   if (points === 10) {
  //     setCard(clearCard);
  //     setPoints(0);
  //   }
  // }

  // function logout() {
  //   history.push("/");
  // }

  return (
    <>
      {/* <div style={Container}>
        <div style={CardShape}>
          <div className="loyalties">
            <br />
            {loyalty > 0 ? "You have " : null}
            {loyalty > 0 ? loyalty : null}
            {loyalty > 0 && loyalty === 1
              ? " FREE coffee"
              : loyalty > 1
              ? " FREE coffee's"
              : null}
          </div>
          <h2>Card</h2>
          <div style={Row}>
            <div onClick={() => handleClick(0)} style={Checker}>
              {card[0]}
            </div>
            <div onClick={() => handleClick(1)} style={Checker}>
              {card[1]}
            </div>
            <div onClick={() => handleClick(2)} style={Checker}>
              {card[2]}
            </div>
            <div onClick={() => handleClick(3)} style={Checker}>
              {card[3]}
            </div>
            <div onClick={() => handleClick(4)} style={Checker}>
              {card[4]}
            </div>
            <div onClick={() => handleClick(5)} style={Checker}>
              {card[5]}
            </div>
            <div onClick={() => handleClick(6)} style={Checker}>
              {card[6]}
            </div>
            <div onClick={() => handleClick(7)} style={Checker}>
              {card[7]}
            </div>
            <div onClick={() => handleClick(8)} style={Checker}>
              {card[8]}
            </div>
            <div onClick={() => handleClick(9)} style={Checker}>
              {card[9]}
            </div>
          </div>
          <br />
          <button onClick={handleRedeem}>Redeem</button>
          <button onClick={handleStoreLoyalty}>Store Loyalty</button>
          <br />
          <button onClick={() => handleClick(points)}>Stamp</button>
        </div>
      </div>
      <input type="email" placeholder="email" />
      <button onClick={logout}>Logout</button> */}
      <h1>Signup</h1>
      <input
        id="email"
        label="* Email"
        onChange={handleEmailChange}
        placeholder="Enter Email Here"
        type="email"
        value={email}
      />
      <input
        id="name"
        label="* name"
        onChange={handleNameChange}
        placeholder="Enter name Here"
        type="name"
        value={name}
      />
      <input
        id="password"
        label="* Password"
        onChange={handlePasswordChange}
        placeholder="Enter Password Here"
        type="password"
        value={password}
      />
      <input
        id="confirm-password"
        label="* Confirm Password"
        onChange={handleConfirmPasswordChange}
        placeholder="Enter Password Again Here"
        type="password"
        value={confirmPassword}
      />
      {firebaseErr}
      <button disabled={isSigningUp} onClick={handleSignup}>
        Sign{isSigningUp ? "ing" : ""} Up
      </button>
    </>
  );
}

export default Admin;
