import React from "react";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

function Input({ submitHandler }) {
  const [description, setDescription] = useState("");

  const changeHandler = (e) => {
    setDescription(e.target.value);
  };
  return (
    <form
      className="absolute bottom-0    left-[50%] [transform:translate(-50%,-50%)] w-full flex justify-center items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (description.trim() != "") {
          submitHandler(description);
        }
        setDescription("");
      }}
    >
      <input
        type="text"
        className="w-4/5 lg:w-3/5 bg-dark-400 p-3 outline-none rounded-md font-montserrat font-light text-accent-100 focus:outline-2 focus:outline-dark-100"
        placeholder="Walk the Duck"
        value={description}
        onChange={(e) => changeHandler(e)}
      />
      <button type="submit">
        <HiOutlinePlus
          size={35}
          className="bg-primary p-1 rounded-2xl text-dark-300 "
        />
      </button>
    </form>
  );
}

export default Input;
