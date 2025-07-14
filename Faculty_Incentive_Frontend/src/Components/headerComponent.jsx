import React from "react";
import "../App.css";
import imagepath from "./images/logo2.png"; // You may replace this with GEHU's logo path

function HeaderComponent() {
  return (
    <header className="w-full bg-[#7A2048] text-white flex flex-col md:flex-row justify-center items-center p-2">
      <img
        src={imagepath}
        alt="GEHU Logo"
        className="h-20 rounded-full mb-4 md:mb-0 mt-4"
      />
      <div className="text-center md:text-left md:ml-10">
        <h1 className="text-4xl font-medium tracking-wide" style={{ fontFamily: "'cg omega', 'Times New Roman', 'Garamond'" }}>
          GRAPHIC ERA HILL UNIVERSITY
        </h1>
        <p className="text-xl font-serif leading-tight mt-2" style={{ fontFamily: "'cg omega', serif" }}>
          Transforming Dreams Into Reality
        </p>
        <p className="text-sm font-serif leading-tight mt-2" style={{ fontFamily: "'cg omega', serif" }}>
          (Deemed to be University, NAAC 'A+' Grade)
        </p>
      </div>
    </header>
  );
}

export default HeaderComponent;
