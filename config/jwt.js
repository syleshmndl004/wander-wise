import jwt from "jsonwebtoken";

export const generateAccessToken = async (
    data,expiresIn = process.env.JWT_EXPIRES_IN 
) => {
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn });
    return token;
}
export const verifyAccessToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded?.userId ?? decoded?.tripId;
}