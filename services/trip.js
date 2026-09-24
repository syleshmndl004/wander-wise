import Trip from '../models/trip.js';
import { NotFoundError } from '../errors/not-found.js';
import { ConflictError } from '../errors/conflict.js';
import { generateAccessToken,verifyAccessToken } from '../config/jwt.js';
import sendEmail from '../utils/send-mail.js';

export const create = async (data) => {
  const trip = await Trip.create(data);
  return trip;
}

export const index = async (userId) => {
  const trips = await Trip.find({ user: userId });
  return trips;
}


export const find = async (id, userId) => {
  const trip = await Trip
    .findOne({ _id: id, user: userId })
    .populate('user', 'name')
    .populate('collaborators', 'email');

  if (!trip) throw new NotFoundError('Trip not found');
  return trip;
}

export const update = async (id, data, userId) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: id, user: userId }, data, { returnDocument: 'after', });

  if (!trip) throw new NotFoundError('Trip not found');
  return trip;
}

export const remove = async (id, userId) => {
  const trip = await Trip.findOneAndDelete({ _id: id, user: userId });
  if (!trip) throw new NotFoundError('Trip not found');
  return trip;
}
export const invite = async (id, userId, collaboratorEmails) => {
  const trip = await find(id, userId);

  if (
    trip.collaborators?.some((collaborator) =>
      collaboratorEmails.includes(collaborator.email)
    )
  ) {
    throw new ConflictError("Collaborator already invited");
  }

  const token = await generateAccessToken({ tripId: id }, '1h');

  const invitationLink = `${process.env.FRONTEND_URL}/trips/${id}/invite/accept?token=${token}`;

  await sendEmail(collaboratorEmails.join(","), "Invitation to join a trip", {
    link: invitationLink,
    title: trip.title,
    startDate: trip.startDate.toDateString(),
    endDate: trip.endDate.toDateString(),
    name: trip.user.name,
  });

  return { message: "Collaborators invited successfully" };
}

export const accept = async (token, userId) => {
  const tripId = verifyAccessToken(token);
  const trip = await Trip.findOne({ _id: tripId }).populate(
    "collaborators",
  );
  if (!trip) throw new NotFoundError("Trip not found");

  if (trip.collaborators.some
    ((collaborator) => collaborator._id.toString() === userId.toString()
    )) {
    throw new ConflictError("User already a collaborator");
  }
  trip.collaborators.push(userId);
  await trip.save();
  return { message: "Invitation accepted successfully" };
}