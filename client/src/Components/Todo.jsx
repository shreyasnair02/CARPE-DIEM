import React from "react";
import Modal from "./Modal";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
function Todo({ data, completeHandler, deleteHandler, editHandler }) {
  const [tick, setTick] = useState(data.completed);
  const [truncate, setTruncate] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const id = useRef(null);
  const truncateStyle = " truncate w-3/4 ";
  const handleModalClose = () => {
    setEditModal(false);
  };
  return (
    <AnimatePresence wait={true}>
      <motion.div
        className="flex items-center bg-dark-200 pl-3 p-3 rounded-xl box shadow-md cursor-default hover:shadow-yellow-100/10 transition duration-150 ease-in font-normal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, staggerChildren: true }}
        onClick={(e) => {
          setTruncate((prev) => !prev);
        }}
      >
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 mr-3 accent-dark-100 bg-dark-200 border-2 border-accent-200 cursor-pointer"
          defaultChecked={tick}
          onClick={(e) => {
            e.stopPropagation();
            setTick((prev) => !prev);
            setTimeout(() => {
              completeHandler(data.id);
            }, 500);
          }}
        />
        <span
          className={
            (tick
              ? " line-through opacity-60 transition duration-500 ease-out "
              : "") +
            (truncate ? truncateStyle : " ") +
            " transition duration-500 ease-in-out  "
          }
        >
          {data.description}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <BsPencilSquare
            size={25}
            className="text-primary cursor-pointer"
            onClick={(e) => {
              id.current = data.id;
              setEditModal((prev) => !prev);
            }}
          />
          <FiTrash
            size={35}
            className="rounded-2xl  lg:mr-4 p-2 text-danger-100 cursor-pointer hover:bg-danger-200 transition duration-300 ease-out "
            onClick={() => deleteHandler(data.id)}
          />
        </div>
      </motion.div>
      {editModal && (
        <Modal
          handleModalClose={handleModalClose}
          editHandler={editHandler}
          id={id.current}
          data={data}
          key={Math.random() + ""}
        />
      )}
    </AnimatePresence>
  );
}

export default Todo;
