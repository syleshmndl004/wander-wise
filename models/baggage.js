import { Schema, model } from "mongoose";

const BaggageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,//means no null value is allowed for this field. It ensures that every baggage item must have a name.
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,//it will be used to track whether the baggage item has been packed or not. By default, it is set to false, indicating that the item has not been packed yet.
    },
    user: {
      type: Schema.Types.ObjectId,//
      ref: "User",//it takes the reference of the user model and it will be used to populate the user data in the baggage model
      required: true,
    },
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    
  },
  { 
    timestamps: true, // Optional: tracking when item was added/updated
  }
);

const Baggage = model("Baggage", BaggageSchema);
export default Baggage;

