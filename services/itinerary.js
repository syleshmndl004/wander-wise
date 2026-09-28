import Itinerary from "../models/itinerary.js";
import { NotFoundError } from "../errors/not-found.js";
import { find as findTrip } from "./trip.js";

export const create = async (data) => {
  await findTrip(data.trip, data.user);
  const { user, ...itineraryData } = data;

  return Itinerary.create(itineraryData);
};

export const index = async (tripId, userId) => {
  await findTrip(tripId, userId);
  return Itinerary.find({ trip: tripId }).sort({ date: 1, "activities.time": 1 });
};

export const find = async (itineraryId, tripId, userId) => {
  await findTrip(tripId, userId);

  const itinerary = await Itinerary.findOne({
    _id: itineraryId,
    trip: tripId,
  });

  if (!itinerary) throw new NotFoundError("Itinerary not found");
  return itinerary;
};

export const update = async (itineraryId, tripId, userId, data) => {
  await findTrip(tripId, userId);

  const itinerary = await Itinerary.findOneAndUpdate(
    { _id: itineraryId, trip: tripId },
    data,
    { returnDocument: "after", runValidators: true },
  );

  if (!itinerary) throw new NotFoundError("Itinerary not found");
  return itinerary;
};

export const remove = async (itineraryId, tripId, userId) => {
  await findTrip(tripId, userId);

  const itinerary = await Itinerary.findOneAndDelete({
    _id: itineraryId,
    trip: tripId,
  });

  if (!itinerary) throw new NotFoundError("Itinerary not found");
  return itinerary;
};
