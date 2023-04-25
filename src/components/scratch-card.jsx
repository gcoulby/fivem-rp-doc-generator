import React, { useState, useEffect, useContext } from "react";
import "../styles/scratch-card.css";
import { AppContext } from "../App";
import Scratch from "../img/scratch.png";
import scratchCardValues from "../lists/scratch-card-values";
import lotto from "../img/lotto.png";

function ScratchCard(props) {
  let context = useContext(AppContext);
  const [win, setWin] = useState(false);

  const setVals = () => {
    let vals = [];
    let cardVals = [...scratchCardValues];
    for (let i = 0; i < 9; i++) {
      if (win && i < 3) {
        vals.push(scratchCardValues[scratchCardValues.length - 1]);
      } else {
        let val = cardVals[Math.floor(Math.random() * (cardVals.length - 1))];
        vals.push(val);
        cardVals = [...cardVals].filter((v) => v !== val);
      }
      vals.sort(() => Math.random() - 0.5);
    }
    return vals;
  };

  const [values, setValues] = useState(setVals());
  const [cardCode, setCardCode] = useState(context.createContractCode());

  return (
    <>
      <div className="col-sm-12 col-md-4">
        <div className="btn-group mb-4" role="group" aria-label="Basic checkbox toggle button group">
          <input type="checkbox" className="btn-check" id="btncheck1" checked={win} onChange={() => setWin(!win)} />
          <label className="btn btn-outline-dark" htmlFor="btncheck1">
            Winning Card?
          </label>
        </div>

        <button
          className="btn btn-dark form-control"
          onClick={() => {
            setCardCode(context.createContractCode());
            setValues(setVals());
          }}
        >
          {" "}
          Refresh
        </button>
        <hr />
        <div>
          <button className="btn btn-dark form-control" type="button" onClick={() => context.imageToDiscord()}>
            Copy Image URL to Clipboard
          </button>
        </div>
      </div>
      <div id="scratch-card" className="col-sm-12 col-md-8">
        <div id="card" ref={context.printRef}>
          <div className="corner">
            <h1>$10</h1>
          </div>
          <div className="stars"></div>
          <div className="title">
            <span className="title-top">TOP</span>
            <span className="title-prize">PRIZE</span>
            <span className="title-amount">$50,000</span>
          </div>
          <div className="strap">
            <span className="strap-top">Match</span>
            <span className="strap-middle">3</span>
            <span className="strap-bottom">to win</span>
          </div>
          <div className="lotto-logo">
            <img src={lotto} alt="Lotto" width={200} />
          </div>
          <div className="buttons">
            {values.map((value, index) => (
              <button key={"scratcha_" + index} id={"btn" + index} className="btn scratch">
                <img src={Scratch} alt="Scratch" width={"100%"} />
                <div className="scratch-btn-text">{value.valueText}</div>
                <div className="scratch-btn-text-sm">{value.text}</div>
              </button>
            ))}
          </div>

          <div className="serial-box">
            <span id="serialNumber">{cardCode}</span>
          </div>

          <div id="result-box"></div>
        </div>
      </div>
    </>
  );
}

export default ScratchCard;
