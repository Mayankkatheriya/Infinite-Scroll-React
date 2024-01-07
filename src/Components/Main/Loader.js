import React from "react";
import loadergif from '../Assets/loader.gif'

const Loader = () => {
  return (
    <div className="loader">
      <img src={loadergif} alt="" />
    </div>
  );
};

export default Loader;
