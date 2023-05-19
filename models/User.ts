import {Document, Schema, model} from "mongoose";
// npm i validator, we also need npm @types for validator
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface InterfaceUser {
  name: string,
  lastName: string,
  email: string,
  password: string | undefined,
  location: string,
  createJWT?: any
  comparePassword?: any
}

export interface InterfaceUser extends Document {}

const UserSchema: Schema = new Schema({
  name: {
    type: String, 
    required: [true, 'Plese provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  lastName: {
    type: String, 
    required: [true, 'Plese provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
    default: 'Uymaz'
  },
  email: {
    type: String,
    required: [true, 'Please provide your email addres'],
    // uniqie: true -> there is no other email in the database!
    unique: true,
    validate: {
      validator: function() {return validator.isEmail},
      message: 'Please provide a valid email'
    }
    },
  password: {
    type: String,
    required: [true, 'Please provide your desired password'],
    minlength: 6,
    //"select: false" -> do not send password in response
    select: false,
  },
  location: {
    type: String,
    trim: true,
    default: 'Sofia, Bulgaria'
  }
});

// IMPORTANT, DO NOT USE ARROW FUNCTION!
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// BETTER NOT USE ARROW FUNCTION!
UserSchema.methods.createJWT = function() {
  return jwt.sign({userId: this._id}, process.env.JWT_SECRET as string, {expiresIn: process.env.JWT_LIFETIME});
}

// IMPORTANT, DO NOT USE ARROW FUNCTION!
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

export default model<InterfaceUser>('User', UserSchema);
