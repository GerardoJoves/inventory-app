const mongoose = require('mongoose');
require('dotenv').config();

// set up db connection
const mongodb = process.env.MONGODB_URL;
mongoose.set('strictQuery', true);

async function connectDB() {
  await mongoose.connect(mongodb);
}

connectDB().catch((err) => {
  console.log(err);
  // make the process fail
  process.exit(1);
});
