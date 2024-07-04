import React from "react";
import "./sample1.css";
import pic1 from "../assets/pic_1.png";
import image3 from "../assets/image_3.png";
import image2 from "../assets/image_2.png";
import pixel from "../assets/pixelfan.png";


export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="div">
        <div className="overlap">
          <div className="overlap-group">
          <img className="pic" alt="Pic" src={pic1} />
        
          </div>
          <img className="pic" alt="Pic" src={image2} />
          <div className="overlap-2">
          <img className="pic" alt="Pic" src={image3} />
                     <img className="pic" alt="Pic" src={pixel} />

          </div>
        </div>
        <div className="overlap-3">
          <div className="text-wrapper">Buy</div>
          <div className="text-wrapper-2">Sell</div>
          <div className="text-wrapper-3">DYNO</div>
          <div className="text-wrapper-4">Home</div>
          <div className="text-wrapper-5">About Us</div>
        </div>
      </div>
    </div>
  );
};
