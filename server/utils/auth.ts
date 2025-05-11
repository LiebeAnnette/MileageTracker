import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = "2h";

export function signToken(user) {
  const payload = { _id: user._id, email: user.email, username: user.username };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function authMiddleware({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (token && token.startsWith("Bearer ")) token = token.slice(7);

  if (!token) return req;

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
  } catch (err) {
    console.error("Invalid token");
  }
  return req;
}
