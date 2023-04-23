import React, { useState, useEffect, useContext } from "react";
import polaroid from "../img/PolaroidBlank.png";
import paperclip from "../img/paperclip.png";
function Polaroid(props) {
  useEffect(() => {
    let canvas = document.querySelector(".polaroid-canvas");
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = props.imageUrl;
  }, [props.imageUrl]);

  return (
    <>
      <div className="polaroid">
        {/* <img className="polaroid-image" src={props.imageUrl} alt="image" width="100%" /> */}
        <canvas className="polaroid-canvas" width="100%" height="100%" />
        <img className="polaroid-surround" src={polaroid} alt="San Andreas State Seal" width="100%" />
        <img className="paperclip" src={paperclip} alt="San Andreas State Seal" width="40%" />

        <span className="polaroid-text cherish">{props.text}</span>
      </div>
    </>
  );
}

export default Polaroid;
