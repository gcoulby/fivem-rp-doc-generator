import React, { useState, useEffect, useContext } from "react";

import logo from "../img/SanAndreasStateSeal.png";
import names from "../lists/names";
import streetNames from "../lists/street_names";
import banks from "../lists/banks";
import FormController from "./form-controller";
import { AppContext } from "../App";

function HomeRepoForm(props) {
  let context = useContext(AppContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(120000);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [outstandingBalance, setOutstandningBalance] = useState(100000);
  const [heir, setHeir] = useState("");
  const [heirAddress, setHeirAddress] = useState("");
  const [heir2, setHeir2] = useState("");
  const [heir2Address, setHeir2Address] = useState("");
  const [docId] = useState(Math.floor(Math.random() * 1000000));
  const [lien] = useState(`${banks[Math.floor(Math.random() * banks.length)]}`);
  const [lienName, setLienName] = useState(
    `${names.first_names[Math.floor(Math.random() * names.first_names.length)]} ${
      names.last_names[Math.floor(Math.random() * names.last_names.length)]
    }`
  );
  const [repoCompany, setRepoCompany] = useState("San Andreas State Recoveries");
  const [repoCompanyRep, setRepoCompanyRep] = useState("Jet Morris");

  return (
    <>
      <div className="col-sm-12 col-md-4">
        <FormController
          label={"Name of Estate Holder"}
          value={name}
          setValue={setName}
          showRoller={true}
          rollValue={() => setName(context.rollName())}
        />
        <FormController
          label={"Address of Estate Holder"}
          value={address}
          setValue={setAddress}
          showRoller={true}
          rollValue={() => setAddress(context.rollAddress())}
        />
        <FormController label={"Name of Heir"} value={heir} setValue={setHeir} showRoller={true} rollValue={() => setHeir(context.rollName())} />
        <FormController
          label={"Address of Heir"}
          value={heirAddress}
          setValue={setHeirAddress}
          showRoller={true}
          rollValue={() => setHeirAddress(context.rollAddress())}
        />
        <FormController
          label={"Name of 2nd Heir"}
          value={heir2}
          setValue={setHeir2}
          showRoller={true}
          rollValue={() => setHeir2(context.rollName())}
        />
        <FormController
          label={"Address of 2nd Heir"}
          value={heir2Address}
          setValue={setHeir2Address}
          showRoller={true}
          rollValue={() => setHeir2Address(context.rollAddress())}
        />
        <FormController
          label={"Purchase Price"}
          type={"number"}
          min={120000}
          max={1000000}
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
          min={100000}
          max={1000000 - purchasePrice}
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
              <div className="col-5" />
              <div className="col-2">
                <img src={logo} alt="San Andreas State Seal" width="100%" />
              </div>
              <div className="col-5" />
            </div>
            <div className="row">
              <div className="col-12 doc-header">
                <h2>San Andreas Department of State Affairs</h2>
                <hr />
              </div>
            </div>
            <div className="row">
              {/* <div className="col-8 doc-body"></div> */}
              <div className="col-12 doc-body text-end">
                <p>REFERENCE NUMBER: {docId}</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 doc-body">
                <p>
                  <strong>ESTATE OF:</strong> <span className="marke form-field-inline ">{name}</span> has been valued at{" "}
                  <span className="marke form-field-inline">{context.formatter.format(purchasePrice)}</span> and is subject to the lien <br />
                  <span className="marke form-field-inline">{lien}</span> for the amount of{" "}
                  <span className="marke form-field-inline">{context.formatter.format(outstandingBalance)}</span>. <br />
                  <br />
                  The estate is located at <span className="marke form-field-inline w-300">{address}</span> and will be subject to the lien for any
                  outstanding balance once goods retrieved from the estate are sold. The estate is to be liquidated and the proceeds of the sale are
                  to be distributed evenly to the following heirs, <strong>after the lien is paid in full</strong>:
                  <br />
                  <br />
                  <span className="marke form-field-inline">{heir}</span> at <span className="marke form-field-inline w-300">{heirAddress}</span>
                  <br />
                  <br />
                  <span className="marke form-field-inline">{heir2}</span> at <span className="marke form-field-inline w-300">{heir2Address}</span>
                  <br />
                  <br />
                  <span className="marke form-field-inline">&emsp;</span> at <span className="marke form-field-inline w-300"></span>
                  <br />
                  <br />
                  <span className="marke form-field-inline">&emsp;</span> at <span className="marke form-field-inline w-300"></span>
                  <br />
                  <br />
                  The retrieval of assets is to be done by <span className="marke form-field-inline w-300">{repoCompany}</span>, who will also be
                  responsible for the sale of the goods. It is understood that squaters and trespassers are residing in the property and are to be
                  removed from the estate, if present. Any goods found on the premises will be considered abandoned and subject to the lien.
                  <span className="marke form-field-inline w-300">{repoCompany}</span> has been authorized by the San Andreas Department of State
                  Affairs to remove any squaters or trespassers from the estate and to retrieve any goods found on the premises. <br /> <br />
                  <strong>
                    Any illegal activity found on the premises will be reported to the San Andreas Department of State Affairs and the San Andreas
                    State Police.{" "}
                  </strong>
                  <br /> <br />
                </p>
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

export default HomeRepoForm;
