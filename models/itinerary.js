import {Schema, model} from "mongoose";

const activitySchema = new Schema({
    name: {
        type: String,
        required: true, 
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
    },
    description:{
        type: String,
    },
    activities: [activitySchema],
  });
    