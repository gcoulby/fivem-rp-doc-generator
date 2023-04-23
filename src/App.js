import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import RepoForm from "./components/repo-form";
import logo from "./img/BlackOutGroup.png";
import { useState } from "react";
import Navbar from "./components/navbar";
import DiscordService from "./services/DiscordService";
import html2canvas from "html2canvas";

function App() {
  const printRef = React.useRef();
  const [password, setPassword] = useState("");
  const [sadha2n448, setSadha2n448] = useState(false);
  const [tool, setTool] = useState("lizard-lick");
  const [tools, setTools] = useState(["Vehicle Repossessions"]);
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
        console.log(res.data.attachments[0].url);
        navigator.clipboard.writeText(res.data.attachments[0].url);
      });
    });
  };

  return (
    <>
      {sadha2n448 ? (
        <>
          <Navbar setTool={setTool} tools={tools} selectedToolIndex={selectedToolIndex} setSelectedToolIndex={setSelectedToolIndex} />
          <div id="page-container">
            <div className="container-fluid">
              {selectedToolIndex === "Vehicle Repossessions" ? (
                <RepoForm imageToDiscord={imageToDiscord} printRef={printRef} />
              ) : (
                <>
                  <h1>Select a tool</h1>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="form-signin-container">
          <main class="form-signin w-100 m-auto text-center">
            <img src={logo} alt="BlackOut Group" className="img-fluid" />
            <h5 class="my-3 fw-normal">Please sign in</h5>

            <div class="form-floating my-3">
              <input
                type="password"
                class="form-control"
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
              <label for="floatingPassword">Password</label>
            </div>

            <button class="w-100 btn btn-lg btn-secondary" type="submit" onClick={(e) => checkPassword(e.target.value)}>
              Sign in
            </button>
            <p class="mt-5 mb-3 text-body-secondary">© 1865–2023</p>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
