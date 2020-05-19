import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";

import { db } from "services";

// import { auth } from "services";

import { CardShape, Checker, Container, Row, RedeemPointsInput } from "styles";

// import { useHistory } from "react-router-dom";

function CardHolders() {
  const [users, setUsers] = useState([]);
  const [redeemPoints, setRedeemPoints] = useState(0);
  // const [card, setCard] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    const unsubscribe = db.collection("cardholders").onSnapshot((snapshot) => {
      const updateUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(updateUsers);
      // setIsFetching(false)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // async function handleStampClick(index) {
  //   const newCard = [...card];
  //   newCard[index] = "X";
  //   await db.collection("cardholders").doc(id).update({
  //     card: newCard,
  //   });
  // }
  async function handleStampClick(index, cardholder) {
    const newCard = [...cardholder.card];
    newCard[index] = "X";
    if (cardholder.card[index] !== "X" && cardholder.points < 10) {
      await db
        .collection("cardholders")
        .doc(cardholder.id)
        .update({
          card: newCard,
          points: cardholder.points + 1,
        });
    }
    if (cardholder.points === 9) {
      await db
        .collection("cardholders")
        .doc(cardholder.id)
        .update({
          loyalty: cardholder.loyalty + 1,
        });
    }
  }

  async function handleRedeemClick({ id, points, loyalty }) {
    const clearCard = ["", "", "", "", "", "", "", "", "", ""];
    if (redeemPoints === 0)
      return alert(
        "Unable To Redeem Loyalty Please Enter A Value Larger Than 0"
      );
    if (redeemPoints > loyalty)
      return alert(
        "You Don't Have Enough Loyalty Points, Please Check Correct Amount was Entered"
      );
    if (
      redeemPoints < 2
        ? window.confirm(
            "You Are About to Redeem " + redeemPoints + " Free Coffee"
          )
        : window.confirm(
            "You Are About to Redeem " + redeemPoints + " Free Coffee's"
          )
    ) {
      if (points === 10) {
        await db.collection("cardholders").doc(id).update({
          card: clearCard,
          points: 0,
        });
      }
      if (loyalty > 0 && redeemPoints <= loyalty) {
        await db
          .collection("cardholders")
          .doc(id)
          .update({
            loyalty: loyalty - redeemPoints,
          });
        setRedeemPoints(0);
      }
    }
  }

  async function handleStoreLoyaltyClick(cardholder) {
    const clearCard = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    if (cardholder.points === 10) {
      await db.collection("cardholders").doc(cardholder.id).update({
        card: clearCard,
        points: 0,
      });
    }
  }

  async function handleRedeemPoints(event) {
    setRedeemPoints(event.target.value);
    event.preventDefault();
  }

  // async function handleStampButtonClick(index, cardholder) {
  //   const newCard = [...cardholder.card];
  //   newCard[index] = "X";
  //   if (cardholder.card[index] !== "X") {
  //     await db
  //       .collection("cardholders")
  //       .doc(cardholder.id)
  //       .update({
  //         card: newCard,
  //         points: cardholder.points + 1,
  //       });
  //   }
  // }
  // const [card, setCard] = useState(["", "", "", "", "", "", "", "", "", ""]);
  // const [points, setPoints] = useState(0);
  // const [loyalty, setLoyalty] = useState(0);
  // const history = useHistory();

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
      {users.map((cardholder) => (
        // return one component eg <Card key={cardholder.id} {...cardholder} /> dont forget to import Card
        <div key={cardholder.id} style={Container}>
          <div style={CardShape}>
            <div className="loyalties">
              {cardholder.loyalty > 0 ? "You have " : null}
              {cardholder.loyalty > 0 ? cardholder.loyalty : null}
              {cardholder.loyalty > 0 && cardholder.loyalty === 1
                ? " FREE coffee"
                : cardholder.loyalty > 1
                ? " FREE coffee's"
                : null}
            </div>
            {/* {cardholder.name} Loyalty: {cardholder.loyalty} points:{" "}
              {cardholder.points} {cardholder.id} email name:{" "}
              {cardholder.emailName} */}
            <h2>Card</h2>
            {cardholder.name}
            <div style={Row}>
              <div
                onClick={() => handleStampClick(0, cardholder)}
                style={Checker}
              >
                {cardholder.card[0]}
              </div>
              <div
                onClick={() => handleStampClick(1, cardholder)}
                style={Checker}
              >
                {cardholder.card[1]}
              </div>
              <div
                onClick={() => handleStampClick(2, cardholder)}
                style={Checker}
              >
                {cardholder.card[2]}
              </div>
              <div
                onClick={() => handleStampClick(3, cardholder)}
                style={Checker}
              >
                {cardholder.card[3]}
              </div>
              <div
                onClick={() => handleStampClick(4, cardholder)}
                style={Checker}
              >
                {cardholder.card[4]}
              </div>
              <div
                onClick={() => handleStampClick(5, cardholder)}
                style={Checker}
              >
                {cardholder.card[5]}
              </div>
              <div
                onClick={() => handleStampClick(6, cardholder)}
                style={Checker}
              >
                {cardholder.card[6]}
              </div>
              <div
                onClick={() => handleStampClick(7, cardholder)}
                style={Checker}
              >
                {cardholder.card[7]}
              </div>
              <div
                onClick={() => handleStampClick(8, cardholder)}
                style={Checker}
              >
                {cardholder.card[8]}
              </div>
              <div
                onClick={() => handleStampClick(9, cardholder)}
                style={Checker}
              >
                {cardholder.card[9]}
              </div>
            </div>
            <div>
              <button onClick={() => handleRedeemClick(cardholder)}>
                Redeem
              </button>
              <input
                style={RedeemPointsInput}
                onChange={handleRedeemPoints}
                type="number"
                placeholder="Qty"
                value={redeemPoints}
              />
              <button onClick={() => handleStoreLoyaltyClick(cardholder)}>
                Store Loyalty
              </button>
              <br />
              <button
                onClick={() => handleStampClick(cardholder.points, cardholder)}
              >
                Stamp
              </button>
            </div>
            <button>Logout</button>
          </div>
        </div>
      ))}
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
    </>
  );
}

export default CardHolders;
