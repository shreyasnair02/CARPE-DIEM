const fs = require("fs").promises;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const pgtools = require("pgtools");
const { Pool } = require("pg");
const dB = "perntodo";
console.log(path.resolve(__dirname, "../.env"));
const config = {
  user: "postgres",
  password: process.env.PASSWORD,
  port: process.env.PORT,
  host: process.env.HOST,
};

const createDB = async () => {
  try {
    await pgtools.createdb(config, dB);
    console.log(`database ${dB} created`);
  } catch (err) {
    console.log(err);
  }
};
const initializePool = async () => {
  await createDB();
  const pool = new Pool({
    ...config,
    database: dB,
  });
  console.log("1");
  const schemaPath = path.join(__dirname, "database.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  await pool.query(schema);
  return pool;
};
module.exports = initializePool;
