import React, { useState, useEffect, useContext } from "react";
import FormController from "./form-controller";
import { AppContext } from "../App";
import classified from "../img/Classified.png";

import Polaroid from "./polaroid";
function HitContract(props) {
  let context = useContext(AppContext);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [target, setTarget] = useState("");
  const [targetAddress, setTargetAddress] = useState("Ten Cents Appartments");
  const [targetLocation, setTargetLocation] = useState("");
  const [targetDescription, setTargetDescription] = useState("");
  const [targetNotes, setTargetNotes] = useState("");
  const [reward, setReward] = useState("");
  const [threatLevel, setThreatLevel] = useState(1);
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [handlerName, setHandlerName] = useState("");
  const [handlerPhone, setHandlerPhone] = useState("");
  const [howToClaim, setHowToClaim] = useState("");

  const createContractCode = () => {
    //code format [0-9A-Z]{6}_([0-9A-Z]{6}_){2}[0-9A-Z]{6}
    let code = "";
    for (let i = 0; i < 3; i++) {
      code += Math.random().toString(36).substr(2, 6) + "_";
    }
    code += Math.random().toString(36).substr(2, 6);
    return code;
  };
  const [contract_code, setContractCode] = useState(createContractCode());

  return (
    <>
      <div className="col-sm-12 col-md-4">
        <FormController label={"Target Name"} value={target} setValue={setTarget} />
        <FormController label={"Image URL"} value={imageUrl} setValue={setImageUrl} />
        <FormController label={"Reward"} value={reward} setValue={setReward} />
        <FormController label={"Target Address"} value={targetAddress} setValue={setTargetAddress} />
        <FormController label={"Target Location"} value={targetLocation} setValue={setTargetLocation} />
        <FormController label={"Target Description"} value={targetDescription} setValue={setTargetDescription} />
        <FormController textarea={true} label={"Target Notes"} value={targetNotes} setValue={setTargetNotes} rows={5} />
        <FormController type={"number"} label={"Threat Level"} value={threatLevel} setValue={setThreatLevel} min={1} max={5} />
        <FormController label={"Occupation"} value={occupation} setValue={setOccupation} />
        <FormController label={"Gender"} value={gender} setValue={setGender} />
        <FormController label={"Handler Name"} value={handlerName} setValue={setHandlerName} />
        <FormController label={"Handler Phone"} value={handlerPhone} setValue={setHandlerPhone} />
        <FormController textarea={true} label={"How to Claim"} value={howToClaim} setValue={setHowToClaim} />
        <hr />
        <div>
          <button className="btn btn-dark form-control" type="button" onClick={() => context.imageToDiscord()}>
            Copy Image URL to Clipboard
          </button>
        </div>
      </div>
      <div className="col-sm-12 col-md-8">
        <div className="doc-container" ref={context.printRef}>
          <div className="doc-page">
            <div className="contract-code libre-barcode">{contract_code}</div>
            <div className="row">
              <div className="col-6">
                <img className="classified-stamp" src={classified} alt="classified stamp" width="100%" />
              </div>
              <div className="col-6 doc-header">
                <Polaroid imageUrl={imageUrl} text={target} />
              </div>
            </div>
            <div className="row mt-4 hit-contract-body">
              <div className="col-1" />
              <div className="col-11 doc-body">
                <div className="row doc-info-form source-code">
                  <div className="col-4">
                    <label className="form-label">Target</label>
                    <input type="text" placeholder="Name" className="form-control" disabled={true} value={target} />
                  </div>
                  <div className="col-8">
                    <label className="form-label">Address</label>

                    <input type="text" placeholder="Address" className="form-control" disabled={true} value={targetAddress} />
                  </div>
                </div>
                <div className="row doc-info-form source-code">
                  <div className="col-12">
                    <label className="form-label">Target Description</label>
                    <input className="form-control" placeholder="Description" disabled={true} value={targetDescription} />
                  </div>
                </div>
                <div className="row doc-info-form source-code">
                  <div className="col-12">
                    <label className="form-label">Last Known Location</label>
                    <input className="form-control" placeholder="Last Known Location" disabled={true} value={targetLocation} />
                  </div>
                </div>
                <div className="row doc-info-form source-code">
                  <div className="col-4">
                    <label className="form-label">Occupation</label>
                    <input className="form-control" placeholder="Occupation" disabled={true} value={occupation} />
                  </div>
                  <div className="col-4">
                    <label className="form-label">Gender</label>
                    <input className="form-control" placeholder="Gender" disabled={true} value={gender} />
                  </div>
                  <div className="col-4">
                    <label className="form-label">Threat Level</label>
                    <input className="form-control" placeholder="Threat Level" disabled={true} value={threatLevel} />
                  </div>
                </div>
                <div className="row doc-info-form source-code">
                  <div className="col-12">
                    <label className="form-label">Notes</label>
                    <textarea
                      className="form-control target-notes source-code-important "
                      placeholder="Notes"
                      disabled={true}
                      value={targetNotes}
                      rows={5}
                    />
                  </div>
                </div>
                <div className="row doc-info-form source-code mt-3 ">
                  <div className="col-12">
                    <h3>
                      REWARD: <span>{context.formatter.format(reward)}</span>
                    </h3>
                  </div>
                </div>

                <div className="row doc-info-form source-code">
                  <div className="col-6">
                    <label className="form-label">Handler</label>
                    <input className="form-control" placeholder="Handler" disabled={true} value={handlerName} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Handler Contact Number</label>
                    <input className="form-control" placeholder="Handler Contact Number" disabled={true} value={handlerPhone} />
                  </div>
                </div>
                <div className="row doc-info-form source-code">
                  <div className="col-12">
                    <label className="form-label">How to claim reward</label>
                    <textarea
                      className="form-control target-notes source-code-important"
                      rows={3}
                      placeholder="How to claim"
                      disabled={true}
                      value={howToClaim}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HitContract;
