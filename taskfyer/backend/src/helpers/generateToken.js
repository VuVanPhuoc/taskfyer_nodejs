import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  console.log('JWT_SECRET:', secretKey); // Debugging line
  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

export default generateToken;