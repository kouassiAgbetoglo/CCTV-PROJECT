// Import the mongoose module
const mongoose = require("mongoose");
require('dotenv').config();

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const MONGODB_URL = process.env.DATABASE_URL;

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  const con = await mongoose.connect(MONGODB_URL);
  console.log(`mangodb connected: ${con.connection.host}`);
}

module.exports = mongoose;
