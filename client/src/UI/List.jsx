import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Completed from "./Completed";
import NotCompleted from "./NotCompleted";
const List = ({ data, completeHandler, deleteHandler,editHandler }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const myRef = useRef(null);
  const myRef2 = useRef(null);
  useEffect(() => {
    const scrollContainer = myRef.current;
    const scrollCover = myRef2.current;
    let scrollTimeoutId = null;
    const handleScroll = () => {
      setIsScrolling(true);
      scrollCover.classList.add("fade");

      clearTimeout(scrollTimeoutId);
      scrollTimeoutId = setTimeout(() => {
        setIsScrolling(false);
        scrollCover.classList.remove("fade");
      }, 1000);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-11/12  flex justify-center relative md:w-3/4">
      <div ref={myRef} className="w-full overflow-y-scroll h-[65vh] scrollbar">
        <div className="text-accent-100 flex flex-col gap-3 ">
          <AnimatePresence wait={true} initial={false}>
            <NotCompleted
              data={data.filter((dt) => !dt.completed)}
              completeHandler={completeHandler}
              deleteHandler={deleteHandler}
            editHandler={editHandler}
            />
          </AnimatePresence>
          <AnimatePresence>
            <Completed
              data={data.filter((dt) => dt.completed)}
              completeHandler={completeHandler}
              deleteHandler={deleteHandler}
            editHandler={editHandler}
            />
          </AnimatePresence>
        </div>
      </div>
      <div
        ref={myRef2}
        className="absolute top-0 right-0 h-full w-1 bg-dark-300 transition duration-500 ease-out"
      ></div>
    </div>
  );
};

export default List;
