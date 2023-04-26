import React, { useState, useEffect, useContext } from "react";

import logo from "../img/pegasus.png";
import names from "../lists/names";
import streetNames from "../lists/street_names";
import banks from "../lists/banks";
import FormController from "./form-controller";
import { AppContext } from "../App";

function PegasusRental(props) {
  let context = useContext(AppContext);
  const [renter, setRenter] = useState("Smudge Dodger");
  const [owner, setOwner] = useState("David Chambers");
  const [rentalStartDate, setRentalStartDate] = useState(context.getDateForDaysPrior(2));
  const [rentalEndDate, setRentalEndDate] = useState(context.getDateForDaysPrior(-7));
  const [rentalPrice, setRentalPrice] = useState(3500);
  const [deposit, setDeposit] = useState(500);
  const [vehicle, setVehicle] = useState("Buckingham Swift");
  const [vin, setVin] = useState(context.rollNumericCode(1000000000, 9999999999));
  const [docId] = useState(context.rollNumericCode(1000000000, 9999999999));

  return (
    <>
      <div className="col-sm-12 col-md-4">
        <FormController label={"Renter"} value={renter} setValue={setRenter} showRoller={true} rollValue={() => setRenter(context.rollName())} />
        <FormController label={"Owner"} value={owner} setValue={setOwner} showRoller={true} rollValue={() => setOwner(context.rollName())} />
        <FormController
          label={"Rental Start Date"}
          value={rentalStartDate}
          setValue={setRentalStartDate}
          showRoller={true}
          rollValue={() => setRentalStartDate(context.rollDate())}
        />
        <FormController
          label={"Rental End Date"}
          value={rentalEndDate}
          setValue={setRentalEndDate}
          showRoller={true}
          rollValue={() => setRentalEndDate(context.rollDate())}
        />
        <FormController
          label={"Rental Price"}
          value={rentalPrice}
          setValue={setRentalPrice}
          showRoller={true}
          rollValue={() => setRentalPrice(context.rollBalance(800, 5000))}
        />
        <FormController
          label={"Deposit"}
          value={deposit}
          setValue={setDeposit}
          showRoller={true}
          rollValue={() => setDeposit(context.rollBalance(100, 500))}
        />
        <FormController label={"Vehicle"} value={vehicle} setValue={setVehicle} />
        <FormController
          label={"VIN"}
          value={vin}
          setValue={setVin}
          showRoller={true}
          rollValue={() => setVin(context.rollNumericCode(1000000000, 9999999999))}
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
              <div className="col-3" />
              <div className="col-6">
                <img src={logo} alt="San Andreas State Seal" width="100%" />
              </div>
              <div className="col-3" />
            </div>
            <div className="row">
              <div className="col-12 doc-header mt-3">
                <div className="doc-title">
                  <h1>Vehicle Rental Agreement</h1>
                </div>
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
                  This Vehicle Rental Contract ("Contract") is made on <strong>{context.getDateForDaysPrior(2)}</strong> between{" "}
                  <strong>{renter}</strong> <em>(the "Renter")</em> and <strong>{owner}</strong> <em>(the "Owner")</em>.
                </p>
                <h6 className="contract-heading">Vehicle Description:</h6>
                <p>
                  The Owner agrees to rent to the Renter the following vehicle:{" "}
                  <strong>
                    {vehicle} - VIN:{vin}
                  </strong>{" "}
                  <em>(the "Vehicle")</em>.
                </p>
                <h6 className="contract-heading">Rental Period:</h6>
                <p>
                  The rental period will begin on <strong>{rentalStartDate}</strong> and end on <strong>{rentalEndDate}</strong>{" "}
                  <em>(the "Rental Period")</em>.
                </p>
                <h6 className="contract-heading">Rental Fee:</h6>
                <p>
                  The Renter agrees to pay the Owner <strong>{context.formatter.format(rentalPrice)}</strong> for the use of the Vehicle during the
                  Rental Period. The Rental Fee includes the cost of insurance coverage for the Vehicle.
                </p>
                <h6 className="contract-heading">Security Deposit:</h6>
                <p>
                  The Renter shall pay a security deposit of <strong>{context.formatter.format(deposit)}</strong> to the Owner at the time of the
                  rental. The security deposit will be refunded to the Renter at the end of the Rental Period provided that the Vehicle is returned in
                  the same condition as when it was rented.
                </p>
                <h6 className="contract-heading">Use of Vehicle:</h6>
                <p>
                  The Renter agrees to use the Vehicle only for the purposes of personal transportation and not for any illegal or prohibited
                  purposes. The Renter shall comply with all applicable laws and regulations relating to the use of the Vehicle.
                </p>
                <h6 className="contract-heading">Maintenance and Repairs:</h6>
                <p>
                  The Renter shall be responsible for any maintenance or repairs required during the Rental Period, unless the need for such
                  maintenance or repairs arises from normal wear and tear. The Renter shall notify the Owner immediately if the Vehicle requires any
                  repairs.
                </p>
                <h6 className="contract-heading">Liability:</h6>
                <p>
                  The Renter shall be responsible for any damage to the Vehicle caused by the Renter or any other person during the Rental Period. The
                  Renter shall also be liable for any loss or damage to any property left in the Vehicle during the Rental Period.
                </p>
                <h6 className="contract-heading">Insurance:</h6>
                <p>
                  The Owner shall provide insurance coverage for the Vehicle during the Rental Period. The Renter shall be responsible for any
                  deductible under the insurance policy in the event of an accident.
                </p>
                <h6 className="contract-heading">Return of Vehicle:</h6>
                <p>
                  The Renter shall return the Vehicle to the Owner at the end of the Rental Period in the same condition as when it was rented, except
                  for normal wear and tear. The Renter shall return the Vehicle with a full tank of fuel. Failure to do so will result in additional
                  charges to the Renter.
                </p>
                <h6 className="contract-heading">Termination:</h6>
                <p>
                  Either party may terminate this Contract upon written notice to the other party if the other party breaches any of the terms of this
                  Contract.
                </p>
                <h6 className="contract-heading">Governing Law:</h6>
                <p>This Contract shall be governed by and construed in accordance with the laws of San Andreas State.</p>
                <h6 className="contract-heading">Entire Agreement:</h6>
                <p>
                  This Contract constitutes the entire agreement between the parties and supersedes all prior understandings or agreements, whether
                  written or oral.
                </p>
                <p>IN WITNESS WHEREOF, the parties have executed this Contract as of the date first written above.</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6 doc-footer">
                <span className="doc-footer-label">Renter: </span>
                <div className="signature wind-song">{context.nameToSignature(renter)}</div>

                <span className="doc-footer-label">Date: </span>
                <div className="doc-footer-underline marke">{rentalStartDate}</div>
              </div>
              <div className="col-6 doc-footer">
                <span className="doc-footer-label">Owner: </span>
                <div className="signature cherish">{context.nameToSignature(owner)}</div>
                <span className="doc-footer-label">Date: </span>
                <div className="doc-footer-underline cherish">{rentalStartDate}</div>
              </div>
            </div>
            <div className="row mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PegasusRental;
