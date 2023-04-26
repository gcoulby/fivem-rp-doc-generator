import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import RepoForm from "./components/repo-form";
import logo from "./img/BlackOutGroup.png";
import { useState } from "react";
import Navbar from "./components/navbar";
import DiscordService from "./services/DiscordService";
import html2canvas from "html2canvas";
import names from "./lists/names";
import streetNames from "./lists/street_names";
import banks from "./lists/banks";
import HitContract from "./components/hit-contract";
import HomeRepoForm from "./components/home-repo-form";
import ScratchCard from "./components/scratch-card";
import PegasusRental from "./components/pegasus-rental";

export const AppContext = React.createContext();

function App() {
  const printRef = React.useRef();
  const [password, setPassword] = useState("");
  const [sadha2n448, setSadha2n448] = useState(false);
  const [tools, setTools] = useState(["Vehicle Repossessions", "Home Repossessions", "Hit Contracts", "Scratch Card", "Pegasus Rental"]);
  const [selectedToolIndex, setSelectedToolIndex] = useState("Vehicle Repossessions");

  const checkPassword = () => {
    let hash = sha256(password).then((hash) => {
      if (hash === "fcc635c20c225ac8bd1e4ee0c61f4468d3f85bdf7b215b45c0b60922a8a685e6") {
        setSadha2n448(true);
      }
    });
  };

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { Send } = DiscordService();

  const getExportFile = async () => {
    // helper function: generate a new file from base64 String
    const base64ToBlob = (dataurl) => {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const sliceSize = 1024;
      const byteChars = window.atob(arr[1]);
      const byteArrays = [];

      for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        let slice = byteChars.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: mime });
    };

    const getFilename = (dataUrl) => {
      const arr = dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];

      return Math.round(+new Date() / 1000) + "." + mime.split("/").pop();
    };

    let element = printRef.current;
    let canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL();
    const blob = base64ToBlob(dataUrl);
    blob.name = getFilename(dataUrl);

    return blob;
  };

  const imageToDiscord = async () => {
    getExportFile().then((file) => {
      Send(file).then((res) => {
        navigator.clipboard.writeText(res.data.attachments[0].url);
      });
    });
  };

  const createContractCode = () => {
    //code format [0-9A-Z]{6}_([0-9A-Z]{6}_){2}[0-9A-Z]{6}
    let code = "";
    for (let i = 0; i < 3; i++) {
      code += Math.random().toString(36).substr(2, 6) + "_";
    }
    code += Math.random().toString(36).substr(2, 6);
    return code;
  };

  const nameToSignature = (name) => {
    const nameArr = name.split(" ");
    const first = nameArr[0];
    const last = nameArr[1];
    return `${first.charAt(0).toUpperCase()}.${last}`;
  };

  const getDateForDaysPrior = (days) => {
    const today = new Date();
    const twoDaysPrior = new Date(today);
    twoDaysPrior.setDate(twoDaysPrior.getDate() - days);
    return twoDaysPrior.toISOString().split("T")[0];
  };

  const rollName = () => {
    const first = names.first_names[Math.floor(Math.random() * names.first_names.length)];
    const last = names.last_names[Math.floor(Math.random() * names.last_names.length)];
    return `${first} ${last}`;
  };

  const rollAddress = () => {
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    const number = Math.floor(Math.random() * 1000);
    const zip = Math.floor(Math.random() * 100000);
    return `${number} ${street}, SA, ${zip}`;
  };

  const rollBalance = (min, max) => {
    let s = Math.random() * (max - min + 1) + min;
    s = parseFloat(s.toFixed(2));
    return s;
  };

  const rollDate = () => {
    const year = Math.floor(Math.random() * 22) + 2000;
    let mRnd = Math.floor(Math.random() * 12) + 1;
    const month = mRnd < 10 ? `0${mRnd}` : mRnd;
    let dRnd = Math.floor(Math.random() * 28) + 1;
    const day = dRnd < 10 ? `0${dRnd}` : dRnd;
    return `${year}-${month}-${day}`;
  };

  const rollNumericCode = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          formatter: formatter,
          imageToDiscord: imageToDiscord,
          printRef: printRef,
          nameToSignature: nameToSignature,
          getDateForDaysPrior: getDateForDaysPrior,
          rollName: rollName,
          rollAddress: rollAddress,
          rollBalance: rollBalance,
          rollDate: rollDate,
          createContractCode: createContractCode,
          rollNumericCode: rollNumericCode,
        }}
      >
        {sadha2n448 ? (
          <>
            <Navbar tools={tools} selectedToolIndex={selectedToolIndex} setSelectedToolIndex={setSelectedToolIndex} />
            <div id="page-container">
              <div className="container-fluid">
                <div className="App">
                  <header className="App-header">
                    <div className="container-fluid">
                      <div className="row">{selectedToolIndex === "Vehicle Repossessions" ? <RepoForm /> : <></>}</div>
                      <div className="row">{selectedToolIndex === "Home Repossessions" ? <HomeRepoForm /> : <></>}</div>
                      <div className="row">{selectedToolIndex === "Hit Contracts" ? <HitContract /> : <></>}</div>
                      <div className="row">{selectedToolIndex === "Scratch Card" ? <ScratchCard /> : <></>}</div>
                      <div className="row">{selectedToolIndex === "Pegasus Rental" ? <PegasusRental /> : <></>}</div>
                    </div>
                  </header>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="form-signin-container">
            <main className="form-signin w-100 m-auto text-center">
              <img src={logo} alt="BlackOut Group" className="img-fluid" />
              <h5 className="my-3 fw-normal">Please sign in</h5>

              <div className="form-floating my-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      checkPassword();
                    }
                  }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button className="w-100 btn btn-lg btn-secondary" type="submit" onClick={(e) => checkPassword(e.target.value)}>
                Sign in
              </button>
              <p className="mt-5 mb-3 text-body-secondary">© 1865–2023</p>
            </main>
          </div>
        )}
      </AppContext.Provider>
    </>
  );
}

export default App;
