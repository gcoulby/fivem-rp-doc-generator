import React, { useState, useEffect } from "react";
import logo from "../img/BlackOutGroup.png";
function Navbar(props) {
  return (
    <>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
          <img src={logo} alt="BlackOut Group" className="img-fluid" style={{ maxHeight: "50px" }} />
          <select
            class="form-select ms-4 bg-dark text-light"
            aria-label="Default select example"
            value={props.selectedToolIndex}
            onChange={(e) => props.setSelectedToolIndex(e.target.value)}
          >
            {props.tools.map((tool) => (
              <option value={tool}>{tool}</option>
            ))}
          </select>
        </div>
      </nav>
      ;
    </>
  );
}

export default Navbar;
