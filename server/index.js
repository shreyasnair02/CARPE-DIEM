const express = require("express");
const cors = require("cors");
const initializePool = require("./db");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const createGetTodos = (pool) => {
  return async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM todo ORDER BY id");
      res.json(result.rows);
    } catch (err) {
      console.log(err);
      res.json({ err });
    }
  };
};
const createGetSpecificTodo = (pool) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        "SELECT * FROM todo WHERE id=($1) ORDER BY id",
        [id]
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
};
const createPostTodo = (pool) => {
  return async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description]
      );
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  };
};
const createUpdateTodo = (pool) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updatedTodo = await pool.query(
        "UPDATE todo SET description =($1) WHERE id=($2) RETURNING *",
        [description, id]
      );
      res.json(updatedTodo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  };
};
const createCompletedTodo = (pool) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const updatedTodo = await pool.query(
        "UPDATE todo SET completed =($1) WHERE id=($2) RETURNING *",
        [completed, id]
      );
      res.json(updatedTodo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  };
};
const createDeleteTodo = (pool) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuery = await pool.query(
        "DELETE FROM todo WHERE id=($1) RETURNING *",
        [id]
      );
      res.json(deletedQuery.rows[0]);
    } catch (err) {
      console.log(err);
    }
  };
};
const initAndRunApp = async () => {
  try {
    const pool = await initializePool();
    app.get("/todos", createGetTodos(pool));
    app.get("/todos/:id", createGetSpecificTodo(pool));
    app.post("/todos", createPostTodo(pool));
    app.put("/todos/description/:id", createUpdateTodo(pool));
    app.put("/todos/completed/:id", createCompletedTodo(pool));
    app.delete("/todos/:id", createDeleteTodo(pool));
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

initAndRunApp();

// initializePool()
//   .then((pool) => {
//     console.log("3");
//     app.get("/todos", async (req, res) => {
//       try {
//         const result = await pool.query("SELECT * FROM todo ORDER BY id");
//         res.json(result.rows);
//       } catch (err) {
//         console.log(err);
//       }
//     });
//     app.get("/todos/:id", async (req, res) => {
//       try {
//         const { id } = req.params;
//         const result = await pool.query(
//           "SELECT * FROM todo WHERE id=($1) ORDER BY id",
//           [id]
//         );
//         res.json(result.rows);
//       } catch (err) {
//         console.log(err);
//       }
//     });

//     app.post("/todos", async (req, res) => {
//       try {
//         const { description } = req.body;
//         const newTodo = await pool.query(
//           "INSERT INTO todo (description) VALUES ($1) RETURNING *",
//           [description]
//         );
//         res.json(newTodo.rows[0]);
//       } catch (err) {
//         console.log(err);
//       }
//     });

//     app.put("/todos/description/:id", async (req, res) => {
//       try {
//         const { id } = req.params;
//         const { description } = req.body;
//         const updatedTodo = await pool.query(
//           "UPDATE todo SET description =($1) WHERE id=($2) RETURNING *",
//           [description, id]
//         );
//         res.json(updatedTodo.rows[0]);
//       } catch (err) {
//         console.log(err);
//       }
//     });
//     app.put("/todos/completed/:id", async (req, res) => {
//       try {
//         const { id } = req.params;
//         const { completed } = req.body;
//         const updatedTodo = await pool.query(
//           "UPDATE todo SET completed =($1) WHERE id=($2) RETURNING *",
//           [completed, id]
//         );
//         res.json(updatedTodo.rows[0]);
//       } catch (err) {
//         console.log(err);
//       }
//     });

//     app.delete("/todos/:id", async (req, res) => {
//       try {
//         const { id } = req.params;
//         const deletedQuery = await pool.query(
//           "DELETE FROM todo WHERE id=($1) RETURNING *",
//           [id]
//         );
//         res.json(deletedQuery.rows[0]);
//       } catch (err) {
//         console.log(err);
//       }
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is listening on PORT ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
