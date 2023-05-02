import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Modal({ handleModalClose, id, data, editHandler }) {
  const [description, setDescription] = useState(data.description);
  const dropIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transition: {
        duration: 0.51,
      },
    },
  };
  const handleChange = (description) => {
    setDescription(description);
  };
  return ReactDOM.createPortal(
    <>
      <motion.div
        onClick={handleModalClose}
        className="fixed inset-0 flex items-center justify-center bg-[#1b1b1bd2] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-4 rounded-xl flex flex-col min-w-fit text-white w-5/6 md:w-3/5 bg-dark-300 justify-center items-center"
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            editHandler(id, description);
            handleModalClose();
          }}
        >
          <textarea
            cols="15"
            rows="3"
            className="bg-dark-100 w-11/12 rounded-lg outline-none p-2 font-montserrat mt-2 ml-4 mr-4 mb-8"
            value={description}
            onChange={(e) => handleChange(e.target.value)}
          />
          <div className="w-full justify-end flex gap-2 mr-10 text-base">
            <button
              className="p-2 text-slate-400  rounded-2xl"
              onClick={handleModalClose}
            >
              Close
            </button>
            <button
              className="px-5 bg-primary text-black rounded-3xl font-montserrat font-medium"
              type="submit"
            >
              Save
            </button>
          </div>
        </motion.form>
      </motion.div>
    </>,
    document.getElementById("portal")
  );
}
export default Modal;
