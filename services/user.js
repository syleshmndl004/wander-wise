// Service function for creating a new user
import User from '../models/user.js';

export const create = async (data) => { // Create a new user in the database
    const user = await User.create(data);// Create a new user in the database
    const { password , ...userWithoutPassword } = user.toObject();// Remove the password field from the user object before returning it// ...userWithoutPassword is rest operator that collects the remaining properties of the user object into a new object called userWithoutPassword
    return userWithoutPassword;// Return the user object without the password field
}
 export const index = async () => {
    const users = await User.find({}, { password: 0 });
    return users;
}

export const find = async (param, config) => {
    const user = await User.findOne(param, config);
    return user;
}

export const update = async (id, data) => {
    const user = await User.findByIdAndUpdate(
        id,
        data,
        {
            returnDocument: 'after', // new: true,
            projection: {
                password: 0
            }
        }
    );
    return user;
}

export const remove = async (id) => {
    const user = await User.findByIdAndDelete(id, { projection: { password: 0 } });
    return user;
}