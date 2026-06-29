//import mongoose from "mongoose";
//const { Schema, model } = mongoose;

import { Schema, model } from "mongoose";//mathi ko 2 ta line yesmai xa
import { hash } from "bcrypt";

//const userSchema = new mongoose.Schema({ //yo chai method 1 ho
const UserSchema = new Schema({//yo chai method 2 ho
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true, //ensures that the email field is required
    unique: true, //ensures that no two users can have the same email address
    lowercase: true, //converts the email to lowercase before saving
    trim: true, //trims whitespace from the beginning and end of the string for eg: " john@example.com " will be saved as "john@example.com"

    validate: {
      validator: function (value) { //it will check if the email is valid or not using a regular expression. The regular expression checks for a valid email format, and the test method returns true if the email is valid and false otherwise.
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Invalid email address",
    },
  },
    password: {
      type: String,
      required: true,

    },
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    this.password = await hash(this.password, 10); // Hash the password with a salt round of 10
  }
});

//Ensure password is hashed on update opeartions as well
UserSchema.pre("findOneAndUpdate", async function (next) {
});
  const User = model("User", UserSchema);

  export default User;