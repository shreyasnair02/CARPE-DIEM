import React from "react";
import { BsListTask } from "react-icons/bs";
function Skeleton() {
  return (
    <div className="flex flex-col justify-center items-center font-montserrat font-light mt-48">
      <BsListTask size={70} color="#6e6e6e" className="" />
      <span className="text-[#3d3d3d]  font-thin text-lg">No tasks here</span>
    </div>
  );
}

export default Skeleton;
