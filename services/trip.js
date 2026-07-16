import Trip from '../models/trip.js';

export const create = async (data) => {
  const trip = await Trip.create(data);
  return trip;
};