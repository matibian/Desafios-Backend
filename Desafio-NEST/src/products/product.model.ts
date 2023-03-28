import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  price: Number,
  thumbnail: String,
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
}
