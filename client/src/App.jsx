import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./UI/Navbar";
import List from "./UI/List";
import Input from "./Components/Input";
import Skeleton from "./UI/Skeleton";

function App() {
  const [data, setData] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    await fetch(`${apiURL}/todos`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  const submitHandler = async (description) => {
    const body = { description };
    const response = await fetch(`${apiURL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    getTodos();
  };
  const completeHandler = async (id) => {
    const item = data.find((item) => item.id === id);

    const status = { completed: !item.completed };

    const response = await fetch(`${apiURL}/todos/completed/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status),
    });
    getTodos();
  };
  const deleteHandler = async (id) => {
    const response = await fetch(`${apiURL}/todos/${id}`, {
      method: "DELETE",
    });
    getTodos();
  };
  const editHandler = async (id, description) => {
    if (description.trim() === "") {
      return deleteHandler(id);
    }
    const body = { description };
    const response = await fetch(`${apiURL}/todos/description/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    getTodos();
  };
  return (
    <div className="min-h-[80dvh] bg-dark-300 text-accent-100  relative ">
      <Navbar />
      <div className="flex justify-center mt-28 md:mt-32 items-center">
        {data?.length > 0 ? (
          <List
            data={[...data].reverse()}
            // data={}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            submitHandler={submitHandler}
            editHandler={editHandler}
          />
        ) : (
          <Skeleton />
        )}
      </div>
      <Input submitHandler={submitHandler} />
    </div>
  );
}

export default App;
