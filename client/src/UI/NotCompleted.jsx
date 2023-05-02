import React from "react";
import { AnimatePresence } from "framer-motion";
import Todo from "../Components/Todo";
const NotCompleted = ({
  data,
  completeHandler,
  deleteHandler,
  editHandler,
}) => {
  if (data.length <= 0) return "";
  return (
    <div className="text-accent-100 flex flex-col gap-3">
      <AnimatePresence wait={true} initial={false}>
        {data.map((dt) => (
          <Todo
            data={dt}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            key={dt.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotCompleted;
