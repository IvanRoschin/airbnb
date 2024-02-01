// import mongoose from "mongoose";

// let isConnected = false; // track connection status

// export const connectToDB = async () => {
//   mongoose.set("strictQuery", true);

//   if (isConnected) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI as string, {
//       dbName: process.env.MONGODB_BASE_NAME,
//     });
//     isConnected = true;
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error || "Can`t connect to MongoDB");
//   }
// };
