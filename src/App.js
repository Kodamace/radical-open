import React, { useState } from "react";

import { CardShape, Checker, Container, Row } from "./styles/index";

function App() {
  const [card, setCard] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [points, setPoints] = useState(0);
  const [loyalty, setLoyalty] = useState(0);

  function handleClick(index) {
    const newCard = [...card];
    if (newCard[index] === "") {
      newCard[index] = "X";
      setCard(newCard);
      setPoints(points + 1);
    }
    if (points === 9) setLoyalty(loyalty + 1);
  }

  function handleRedeem() {
    const clearCard = ["", "", "", "", "", "", "", "", "", ""];
    if (window.confirm("Redeem free coffee")) {
      if (points === 10) {
        setCard(clearCard);
        setPoints(0);
        setLoyalty(loyalty - 1);
      }
      if (loyalty > 0) setLoyalty(loyalty - 1);
    }
  }

  function handleStoreLoyalty() {
    const clearCard = ["", "", "", "", "", "", "", "", "", ""];
    if (points === 10) {
      setCard(clearCard);
      setPoints(0);
    }
  }

  return (
    <div style={Container}>
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
  );
}

export default App;
