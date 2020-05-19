import React from "react";
import { CardShape, Checker, Container, Row } from "styles";
import { db } from "services";

//  here we deconstruct the id and card from cardholders with {id, card}
function Card({ id, card, loyalty }) {
  async function handleStampClick(index) {
    const newCard = [...card];
    newCard[index] = "X";
    await db.collection("cardholders").doc(id).update({
      card: newCard,
    });
  }
  return (
    <div>
      <div style={Container}>
        <div className="loyalties">
          {loyalty > 0 ? "You have " : null}
          {loyalty > 0 ? loyalty : null}
          {loyalty > 0 && loyalty === 1
            ? " FREE coffee"
            : loyalty > 1
            ? " FREE coffee's"
            : null}
        </div>
        <div style={CardShape}>
          <div style={Row}>
            <div onClick={() => handleStampClick(0)} style={Checker}>
              {card[0]}
            </div>
            <div style={Checker}>{card[1]}</div>
            <div style={Checker}>{card[2]}</div>
            <div style={Checker}>{card[3]}</div>
            <div style={Checker}>{card[4]}</div>
            <div style={Checker}>{card[5]}</div>
            <div style={Checker}>{card[6]}</div>
            <div style={Checker}>{card[7]}</div>
            <div style={Checker}>{card[8]}</div>
            <div style={Checker}>{card[9]}</div>
          </div>
          <div>
            <button>Redeem</button>
            <button>Store Loyalty</button>
            <br />
            <button>Stamp</button>
          </div>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
