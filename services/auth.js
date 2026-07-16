import { create, find } from './user.js';
import { generateAccessToken } from '../config/jwt.js';// Service function for registering a new user and generating an access token
import {UnauthorizedError} from '../errors/unauthorized.js'; // Importing the UnauthorizedError class for handling authentication errors
import {compare } from 'bcrypt'; // Importing the compare function from bcrypt for password comparison

export const register = async (data) => {
    const user = await create(data);
    return generateAccessToken({ userId: user._id }); //user._id is the unique identifier for the user in the database, which is used to generate a JWT token for authentication.
}

export const login = async (data) => {
    const user = await find({ email: data.email });
    if (!await compare(data.password, user.password)) {
        throw new UnauthorizedError("Invalid credentials.");
    }
    return generateAccessToken({ userId: user._id });
}
