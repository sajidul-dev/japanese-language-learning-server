import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    console.log("Connecting....");
    await mongoose.connect(config.database_url as string);
    console.log("Connected to MongoDB");

    app.listen(config.port, () => {
      console.log(`App is listening to port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
main();
