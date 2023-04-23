import React, { useState, useEffect } from "react";
function FormController(props) {
  return (
    <>
      <label className="form-label">{props.label}</label>
      <div className="input-group mb-3">
        {props.showPrefix && <span className="input-group-text">{props.prefix}</span>}
        <input
          type={props.type ?? "text"}
          placeholder={props.label}
          min={props.min ?? 0}
          disabled={props.disabled}
          className="form-control"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
        {props.showRoller && (
          <span className="input-group-text" onClick={() => props.rollValue()}>
            🎲
          </span>
        )}
      </div>
    </>
  );
}

export default FormController;
