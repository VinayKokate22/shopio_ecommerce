const mongoose = require("mongoose");

const connectDb = async () => {
  const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  //https://www.mongodb.com/community/forums/t/option-usecreateindex-is-not-supported/123048/3
  // not similar to video
  console.log(
    "database connected: ",
    connect.connection.host,
    connect.connection.name
  );
  //we are not using try and catch because in server we have made a funtion do check it out
};

module.exports = connectDb;
