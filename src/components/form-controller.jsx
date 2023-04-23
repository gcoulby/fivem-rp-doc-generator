import React, { useState, useEffect } from "react";
function FormController(props) {
  return (
    <>
      <label className="form-label">{props.label}</label>
      <div className="input-group mb-3">
        {props.showPrefix && <span className="input-group-text">{props.prefix}</span>}
        {props.textarea ? (
          <textarea
            type={props.type ?? "text"}
            placeholder={props.label}
            min={props.min ?? 0}
            max={props.max ?? 2 ^ 53}
            disabled={props.disabled}
            className="form-control"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            rows={props.rows ?? 5}
          ></textarea>
        ) : (
          <input
            type={props.type ?? "text"}
            placeholder={props.label}
            min={props.min ?? 0}
            max={props.max ?? 2 ^ 53}
            disabled={props.disabled}
            className="form-control"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        )}
        {props.showRoller && (
          <span className="input-group-text cursor-pointer" onClick={() => props.rollValue()}>
            🎲
          </span>
        )}
      </div>
    </>
  );
}

export default FormController;
