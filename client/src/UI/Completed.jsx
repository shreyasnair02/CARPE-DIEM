import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";
import Todo from "../Components/Todo";
import { useState } from "react";

const Completed = ({
  data,
  completeHandler,
  deleteHandler,
  submitHandler,
  editHandler,
}) => {
  const [visible, setVisible] = useState(false);
  const classes = "transition duration-300 ease-in ";

  const dropInt = {
    hidden: {
      // y: "-25vh",
      opacity: 0,
    },
    visible: {
      // y: "0",
      opacity: 1,
      transition: {
        // type: "inertia",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      // y: "100vh",
      opacity: 0,
    },
  };

  if (data.length <= 0) return "";
  return (
    <div>
      <div
        className="ml-2 flex items-center gap-1 mb-3 cursor-pointer"
        onClick={() => setVisible((prev) => !prev)}
      >
        <BiChevronDown className={classes + (visible ? "rotate-180" : "")} />
        Completed
      </div>
      {visible && (
        <motion.div
          className="text-accent-100 flex flex-col gap-3"
          variants={dropInt}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <AnimatePresence wait={true} initial={false}>
            {data.map((dt) => (
              <Todo
                data={dt}
                completeHandler={completeHandler}
                deleteHandler={deleteHandler}
                submitHandler={submitHandler}
                editHandler={editHandler}
                key={dt.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Completed;
