import React from "react";

function Navbar() {
  return (
    <div className="w-full p-8 pl-4 md:pl-16 fixed bg-dark-300 top-0 z-10   ">
      <div className="w-[90%] h-[.5px] bg-accent-200 opacity-40 absolute [bottom:10%] [left:50%] [transform:translate(-50%,-50%)] rounded-2xl" />
      <h1 className="uppercase text-2xl md:text-4xl font-light select-none">
        <span>Carpe</span> <span className="text-primary">Diem</span>
      </h1>
    </div>
  );
}

export default Navbar;
