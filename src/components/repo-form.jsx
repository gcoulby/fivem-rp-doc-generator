import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import logo from "../img/SanAndreasStateSeal.png";
import names from "../lists/names";
import streetNames from "../lists/street_names";
import banks from "../lists/banks";
function RepoForm(props) {
  const printRef = React.useRef();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [registration, setRegistration] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [outstandingBalance, setOutstandningBalance] = useState(0);
  const [docId] = useState(Math.floor(Math.random() * 1000000));
  const [lien] = useState(`${banks[Math.floor(Math.random() * banks.length)]}`);
  const [lienName, setLienName] = useState(
    `${names.first_names[Math.floor(Math.random() * names.first_names.length)]} ${
      names.last_names[Math.floor(Math.random() * names.last_names.length)]
    }`
  );
  const [repoCompany, setRepoCompany] = useState("San Andreas State Auto Recovery");
  const [repoCompanyRep, setRepoCompanyRep] = useState("Jet Morris");

  const rollName = () => {
    console.log(names);
    const first = names.first_names[Math.floor(Math.random() * names.first_names.length)];
    const last = names.last_names[Math.floor(Math.random() * names.last_names.length)];
    setName(`${first} ${last}`);
  };

  const rollAddress = () => {
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    const number = Math.floor(Math.random() * 1000);
    const zip = Math.floor(Math.random() * 100000);
    setAddress(`${number} ${street}, SA, ${zip}`);
  };

  const rollPrice = () => {
    const price = Math.random() * 100000;
    setPurchasePrice(price);
  };

  const rollOutstandingBalance = () => {
    const balance = Math.random() * purchasePrice;
    setOutstandningBalance(balance);
  };

  const nameToSignature = (name) => {
    const nameArr = name.split(" ");
    const first = nameArr[0];
    const last = nameArr[1];
    return `${first.charAt(0).toUpperCase()}.${last}`;
  };

  const rollDate = () => {
    const year = Math.floor(Math.random() * 22) + 2000;
    let mRnd = Math.floor(Math.random() * 12) + 1;
    const month = mRnd < 10 ? `0${mRnd}` : mRnd;
    let dRnd = Math.floor(Math.random() * 28) + 1;
    const day = dRnd < 10 ? `0${dRnd}` : dRnd;
    setPurchaseDate(`${year}-${month}-${day}`);
  };

  const rollRepoCompanyRep = () => {
    console.log(names);
    const first = names.first_names[Math.floor(Math.random() * names.first_names.length)];
    const last = names.last_names[Math.floor(Math.random() * names.last_names.length)];
    setRepoCompanyRep(`${first} ${last}`);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const getDateForDaysPrior = (days) => {
    const today = new Date();
    const twoDaysPrior = new Date(today);
    twoDaysPrior.setDate(twoDaysPrior.getDate() - days);
    console.log(twoDaysPrior.toISOString().split("T")[0]);
    return twoDaysPrior.toISOString().split("T")[0];
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <label className="form-label">Name</label>
              <div className="input-group mb-3">
                <input type="text" placeholder="Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                <span className="input-group-text" onClick={() => rollName()}>
                  🎲
                </span>
              </div>
              <label className="form-label">Address</label>
              <div className="input-group mb-3">
                <input type="text" placeholder="Address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                <span className="input-group-text" onClick={() => rollAddress()}>
                  🎲
                </span>
              </div>
              <label className="form-label">Registration</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Registration"
                  className="form-control"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
              </div>
              <label className="form-label">Make</label>
              <div className="input-group mb-3">
                <input type="text" placeholder="Make" className="form-control" value={make} onChange={(e) => setMake(e.target.value)} />
              </div>
              <label className="form-label">Model</label>
              <div className="input-group mb-3">
                <input type="text" placeholder="Model" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} />
              </div>
              <label className="form-label">Purchase Price</label>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  placeholder="Purchase Price"
                  className="form-control"
                  value={purchasePrice.toFixed(2)}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
                <span className="input-group-text" onClick={() => rollPrice()}>
                  🎲
                </span>
              </div>
              <label className="form-label">Purchase Date</label>
              <div className="input-group mb-3">
                <input
                  type="date"
                  placeholder="Purchase Date"
                  className="form-control"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
                <span className="input-group-text" onClick={() => rollDate()}>
                  🎲
                </span>
              </div>
              <label className="form-label">Outstanding Balance</label>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  placeholder="Outstanding Balance"
                  className="form-control"
                  value={outstandingBalance.toFixed(2)}
                  onChange={(e) => setOutstandningBalance(e.target.value)}
                />
                <span className="input-group-text" onClick={() => rollOutstandingBalance()}>
                  🎲
                </span>
              </div>

              <hr />
              <label className="form-label">Repossession Company</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Repossession Company"
                  className="form-control"
                  value={repoCompany}
                  onChange={(e) => setRepoCompany(e.target.value)}
                />
              </div>
              <label className="form-label">Repo Company Representative</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Repo Company Representative"
                  className="form-control"
                  value={repoCompanyRep}
                  onChange={(e) => setRepoCompanyRep(e.target.value)}
                />
                <span className="input-group-text" onClick={() => rollRepoCompanyRep()}>
                  🎲
                </span>
              </div>
              <hr />
              <div>
                <button className="btn btn-dark form-control" type="button" onClick={handleDownloadImage}>
                  Download as Image
                </button>
              </div>
            </div>
            <div className="col-8">
              <div className="doc-container" ref={printRef}>
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
                        This affidavit to be used by repossessing lien holder for securing possession of a motor vehicle that has been unlawfully held
                        by the lessee. It is important to note that repossession of a vehicle must be done lawfully, in accordance with the terms of
                        the Lease Agreement and applicable state and federal laws. The repossession process can be complicated, and it is essential
                        that all actions taken by the lien holder are lawful and in compliance with legal requirements. The legal owner of the motor
                        vehicle, identified in this affidavit, has made numerous attempts to retrieve the vehicle from the lessee, who has failed to
                        make payments in accordance with the Lease Agreement. Despite many attempts to contact the lessee and request the return of
                        the vehicle, they have failed to comply with these requests. Therefore, in accordance with the terms and conditions of their
                        lease agreement the legal owner of the vehicle has initiated the repossession process.
                      </p>
                      <p>
                        As required by state law, the leasee has been notified of the repossession process. Any attempts to unlawfully repossess the
                        vehicle could result in legal liability for the lien holder. Therefore, I hereby affirm that this affidavit is being used by{" "}
                        {repoCompany}, <em>the contracted repossession company</em>, on behalf of {lien}, <em>the repossessing lien holder</em>, to
                        lawfully secure possession of the motor vehicle identified herein. I further affirm that all actions taken by {repoCompany} or{" "}
                        {lien} in the repossession process will be in compliance with state and federal laws, and will be conducted in a lawful and
                        ethical manner.
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 doc-vehicle-info-form">
                      <label className="form-label">Document ID</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text doc-form-span">SASDMV/REP/</span>
                        <input type="text" placeholder="Document ID" disabled={true} className="form-control" value={docId} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 doc-vehicle-info">
                      <div className="row doc-vehicle-info-form">
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
                    <div className="col-4 doc-vehicle-info-form">
                      <label className="form-label">Vehicle Make</label>
                      <input type="text" placeholder="Make" className="form-control" disabled={true} value={make} />
                    </div>
                    <div className="col-4 doc-vehicle-info-form">
                      <label className="form-label">Vehicle Model</label>
                      <input type="text" placeholder="Model" className="form-control" disabled={true} value={model} />
                    </div>
                    <div className="col-4 doc-vehicle-info-form">
                      <label className="form-label">Vehicle Registration</label>
                      <input type="text" placeholder="Registration" className="form-control" disabled={true} value={registration} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-4 doc-vehicle-info-form">
                      <label className="form-label">Purchase Date</label>
                      <input type="text" placeholder="Purchase Date" className="form-control" disabled={true} value={purchaseDate} />
                    </div>
                    <div className="col-4 doc-vehicle-info-form">
                      <label className="form-label">Purchase Price</label>
                      <input
                        type="text"
                        placeholder="Purchase Price"
                        className="form-control"
                        disabled={true}
                        value={`${formatter.format(purchasePrice)}`}
                      />
                    </div>
                    <div className="col-4 doc-vehicle-info-form">
                      <label className="form-label">Outstanding Balance</label>
                      <input
                        type="text"
                        placeholder="Outstanding Balance"
                        className="form-control"
                        disabled={true}
                        value={`${formatter.format(outstandingBalance)}`}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12 doc-vehicle-info-form">
                      <label className="form-label">Repossession Company</label>
                      <input type="text" placeholder="Repossession Company" className="form-control" disabled={true} value={repoCompany} />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6 doc-footer">
                      <span className="doc-footer-label">Lien Signature: </span>
                      <div className="signature wind-song">{nameToSignature(lienName)}</div>
                      <span className="doc-footer-label">Lien: </span>
                      <div className="doc-footer-underline marke">{lien}</div>
                      <span className="doc-footer-label">Date: </span>
                      <div className="doc-footer-underline marke">{getDateForDaysPrior(2)}</div>
                    </div>
                    <div className="col-6 doc-footer">
                      <span className="doc-footer-label">Repossession Company Representative: </span>
                      <div className="signature cherish">{nameToSignature(repoCompanyRep)}</div>
                      <span className="doc-footer-label">Repossession Company: </span>{" "}
                      <div className="doc-footer-underline oooh-baby">{repoCompany}</div>
                      <span className="doc-footer-label">Date: </span>
                      <div className="doc-footer-underline oooh-baby">{getDateForDaysPrior(1)}</div>
                    </div>
                  </div>
                  <div className="row mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default RepoForm;