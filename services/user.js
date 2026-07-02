// Service function for creating a new user
import User from '../models/user.js';

export const create = async (data) => { // Create a new user in the database
    const user = await User.create(data);// Create a new user in the database
    const { password , ...userWithoutPassword } = user.toobject();// Remove the password field from the user object before returning it
    return userWithoutPassword;// Return the user object without the password field
}
  