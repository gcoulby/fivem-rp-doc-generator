import React, { useState, useEffect, useContext } from "react";

import logo from "../img/SanAndreasStateSeal.png";
import names from "../lists/names";
import streetNames from "../lists/street_names";
import banks from "../lists/banks";
import FormController from "./form-controller";
import { AppContext } from "../App";

function RepoForm(props) {
  let context = useContext(AppContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [registration, setRegistration] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(6000);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [outstandingBalance, setOutstandningBalance] = useState(4000);
  const [docId] = useState(Math.floor(Math.random() * 1000000));
  const [lien] = useState(`${banks[Math.floor(Math.random() * banks.length)]}`);
  const [lienName, setLienName] = useState(
    `${names.first_names[Math.floor(Math.random() * names.first_names.length)]} ${
      names.last_names[Math.floor(Math.random() * names.last_names.length)]
    }`
  );
  const [repoCompany, setRepoCompany] = useState("San Andreas State Auto Recovery");
  const [repoCompanyRep, setRepoCompanyRep] = useState("Jet Morris");

  return (
    <>
      <div className="col-sm-12 col-md-4">
        <FormController label={"Name"} value={name} setValue={setName} showRoller={true} rollValue={() => setName(context.rollName())} />
        <FormController
          label={"Address"}
          value={address}
          setValue={setAddress}
          showRoller={true}
          rollValue={() => setAddress(context.rollAddress())}
        />
        <FormController label={"Registration"} value={registration} setValue={setRegistration} />
        <FormController label={"Make"} value={make} setValue={setMake} />
        <FormController label={"Model"} value={model} setValue={setModel} />
        <FormController
          label={"Purchase Price"}
          type={"number"}
          min={6000}
          value={purchasePrice}
          setValue={setPurchasePrice}
          showRoller={true}
          rollValue={() => {
            setPurchasePrice(context.rollBalance(6000, 100000));
            setOutstandningBalance(context.rollBalance(4000, 94000));
          }}
          showPrefix={true}
          prefix="$"
        />
        <FormController
          label={"Purchase Date"}
          type={"date"}
          value={purchaseDate}
          setValue={setPurchaseDate}
          showRoller={true}
          rollValue={() => setPurchaseDate(context.rollDate())}
        />
        <FormController
          label={"Outstanding Balance"}
          type={"number"}
          min={4000}
          value={outstandingBalance}
          setValue={setOutstandningBalance}
          showRoller={true}
          rollValue={() => setOutstandningBalance(context.rollBalance(4000, 94000))}
          showPrefix={true}
          prefix="$"
        />
        <hr />
        <FormController label={"Repo Company"} value={repoCompany} setValue={setRepoCompany} />
        <FormController
          label={"Repo Company Rep"}
          value={repoCompanyRep}
          setValue={setRepoCompanyRep}
          showRoller={true}
          rollValue={() => setRepoCompanyRep(context.rollName())}
        />
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
            <div className="row">
              <div className="col-2">
                <img src={logo} alt="San Andreas State Seal" width="100%" />
              </div>
              <div className="col-9 doc-header">
                <h2>San Andreas State Department of Motor Vehicles</h2>
                <div className="doc-title">
                  <h1>Notice of Repossession of Motor Vehicle or Motorcycle</h1>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 doc-body">
                <p>
                  This affidavit to be used by repossessing lien holder for securing possession of a motor vehicle that has been unlawfully held by
                  the lessee. It is important to note that repossession of a vehicle must be done lawfully, in accordance with the terms of the Lease
                  Agreement and applicable state and federal laws. The repossession process can be complicated, and it is essential that all actions
                  taken by the lien holder are lawful and in compliance with legal requirements. The legal owner of the motor vehicle, identified in
                  this affidavit, has made numerous attempts to retrieve the vehicle from the lessee, who has failed to make payments in accordance
                  with the Lease Agreement. Despite many attempts to contact the lessee and request the return of the vehicle, they have failed to
                  comply with these requests. Therefore, in accordance with the terms and conditions of their lease agreement the legal owner of the
                  vehicle has initiated the repossession process.
                </p>
                <p>
                  As required by state law, the leasee has been notified of the repossession process. Any attempts to unlawfully repossess the vehicle
                  could result in legal liability for the lien holder. Therefore, I hereby affirm that this affidavit is being used by {repoCompany},{" "}
                  <em>the contracted repossession company</em>, on behalf of {lien}, <em>the repossessing lien holder</em>, to lawfully secure
                  possession of the motor vehicle identified herein. I further affirm that all actions taken by {repoCompany} or {lien} in the
                  repossession process will be in compliance with state and federal laws, and will be conducted in a lawful and ethical manner.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-12 doc-info-form">
                <label className="form-label">Document ID</label>
                <div className="input-group mb-3">
                  <span className="input-group-text doc-form-span">SASDMV/REP/</span>
                  <input type="text" placeholder="Document ID" disabled={true} className="form-control" value={docId} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 doc-vehicle-info">
                <div className="row doc-info-form">
                  <div className="col-4">
                    <label className="form-label">Leasee</label>
                    <input type="text" placeholder="Name" className="form-control" disabled={true} value={name} />
                  </div>
                  <div className="col-8">
                    <label className="form-label">Address</label>

                    <input type="text" placeholder="Address" className="form-control" disabled={true} value={address} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-4 doc-info-form">
                <label className="form-label">Vehicle Make</label>
                <input type="text" placeholder="Make" className="form-control" disabled={true} value={make} />
              </div>
              <div className="col-4 doc-info-form">
                <label className="form-label">Vehicle Model</label>
                <input type="text" placeholder="Model" className="form-control" disabled={true} value={model} />
              </div>
              <div className="col-4 doc-info-form">
                <label className="form-label">Vehicle Registration</label>
                <input type="text" placeholder="Registration" className="form-control" disabled={true} value={registration} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-4 doc-info-form">
                <label className="form-label">Purchase Date</label>
                <input type="text" placeholder="Purchase Date" className="form-control" disabled={true} value={purchaseDate} />
              </div>
              <div className="col-4 doc-info-form">
                <label className="form-label">Purchase Price</label>
                <input
                  type="text"
                  placeholder="Purchase Price"
                  className="form-control"
                  disabled={true}
                  value={`${context.formatter.format(purchasePrice)}`}
                />
              </div>
              <div className="col-4 doc-info-form">
                <label className="form-label">Outstanding Balance</label>
                <input
                  type="text"
                  placeholder="Outstanding Balance"
                  className="form-control"
                  disabled={true}
                  value={`${context.formatter.format(outstandingBalance)}`}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 doc-info-form">
                <label className="form-label">Repossession Company</label>
                <input type="text" placeholder="Repossession Company" className="form-control" disabled={true} value={repoCompany} />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6 doc-footer">
                <span className="doc-footer-label">Lien Holder Representative: </span>
                <div className="signature wind-song">{context.nameToSignature(lienName)}</div>
                <span className="doc-footer-label">Lien Holder: </span>
                <div className="doc-footer-underline marke">{lien}</div>
                <span className="doc-footer-label">Date: </span>
                <div className="doc-footer-underline marke">{context.getDateForDaysPrior(2)}</div>
              </div>
              <div className="col-6 doc-footer">
                <span className="doc-footer-label">Repossession Company Representative: </span>
                <div className="signature cherish">{context.nameToSignature(repoCompanyRep)}</div>
                <span className="doc-footer-label">Repossession Company: </span> <div className="doc-footer-underline oooh-baby">{repoCompany}</div>
                <span className="doc-footer-label">Date: </span>
                <div className="doc-footer-underline oooh-baby">{context.getDateForDaysPrior(1)}</div>
              </div>
            </div>
            <div className="row mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RepoForm;
