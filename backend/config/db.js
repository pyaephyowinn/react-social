import mongoose from "mongoose";

export const connectDB = async () => {
  const mongo_uri = process.env.MONGO_URI
  try {
    await mongoose.connect(mongo_uri);
    // await mongoose.connect(
    //   "mongodb+srv://pyaephyowinn:9UjyR6aReMbuQfPx@cluster0.dup6x.mongodb.net/react-social?retryWrites=true&w=majority"
    // );
    console.log("Database Connected");
  } catch (e) {
    console.log('Database ERROR', e);
  }
};

export default connectDB