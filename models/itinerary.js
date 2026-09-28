import {Schema, model} from "mongoose";

const activitySchema = new Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
    },
    time:{
        type: Date,
        required: true,
    },
    notes:[String],
});

  const itinerarySchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        trim: true,
    },
    activities: [activitySchema],
     date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Itinerary = model("Itinerary", itinerarySchema);

export default Itinerary;
    