const app = require("./app");
//config
const dotenv = require("dotenv").config({ path: "config/.env" });
//connecting the database with the server
const connectdatabase = require("./config/dbConnection");
connectdatabase();

//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`The error is ::${err.message}`);
  console.log("shutting down the server sue to unhandled promise rejection");
  process.exit(1);
});
//console.log(youtubekabeta)//such type of error and hadled by the uncaught expection

const server = app.listen(process.env.PORT, () => {
  console.log(" server is listening at http://localhost:", process.env.PORT);
});

//unhandled promise rejection
//example when database is not connected due to some error but the server is still running
// so in such cases we must stop the server because hamari bezzati na ho
process.on("unhandledRejection", (err) => {
  console.log(`The error is ::${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

//This code sets up an event listener for unhandled promise rejections in a Node.js application. When a promise is rejected but no catch block handles the rejection, Node.js emits an unhandledRejection event. This event can be listened to using process.on().
//The code you provided attaches a listener function to the unhandledRejection event. This function logs an error message to the console, shuts down the server, and exits the Node.js process with a non-zero exit code (1) using process.exit(). The non-zero exit code indicates to the operating system that the process exited with an error.
//This approach ensures that unhandled promise rejections do not cause the Node.js process to continue running in an unpredictable state. Instead, the process is shut down and its exit status indicates that an error occurred. This allows other processes or tools to detect the error and take appropriate action.
//
//
//
//
//
//
//
//This code sets up an event listener for unhandled exceptions in a Node.js application. When an exception is thrown but not caught anywhere in the code, Node.js emits an uncaughtException event. This event can be listened to using process.on().
// The code you provided attaches a listener function to the uncaughtException event. This function logs an error message to the console, shuts down the server, and exits the Node.js process with a non-zero exit code (1) using process.exit(). The non-zero exit code indicates to the operating system that the process exited with an error
// This approach ensures that unhandled exceptions do not cause the Node.js process to continue running in an unpredictable state. Instead, the process is shut down and its exit status indicates that an error occurred. This allows other processes or tools to detect the error and take appropriate action.
// However, it's worth noting that using process.on("uncaughtException") to handle errors is considered a last resort, and it's generally better to handle errors in a structured way using try-catch blocks or catch() methods on promises. This is because uncaught exceptions can leave the process in an unstable state, and some resources may not be cleaned up properly. Therefore, it's important to use this approach judiciously and only as a backup if other error handling mechanisms fail.
