import mongoose from "mongoose";

const connectDB = async () => {
    try { //try does not work then catch will handle the error
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) { //catch will handle the error if there is any error while connecting to the database
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

//commonjs => module.exports = connectDB; // older approach to export the connectDB function
export default connectDB; // ES modules approach to export the connectDB function