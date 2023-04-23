import React, { useState, useEffect } from "react";
import logo from "../img/BlackOutGroup.png";
function Navbar(props) {
  return (
    <>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
          <img src={logo} alt="BlackOut Group" className="img-fluid" style={{ maxHeight: "50px" }} />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <div class="nav-link active" aria-current="page" onClick={(e) => props.setTool("lizard-lick")}>
                  Lizard Lick
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      ;
    </>
  );
}

export default Navbar;
