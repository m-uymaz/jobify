import {RequestHandler} from 'express';
import User, { InterfaceUser } from '../models/User';

const register: RequestHandler = async (req, res, next) => {
  const {name, email, password} = req.body;
  const userAlreadyExists = await User.findOne({email});

  try {
    if(!name || !email || !password) {
      throw new Error('Please provide all values');
    }
    if(userAlreadyExists) {
      throw new Error('User already exists');
    }
    const user: InterfaceUser = await User.create(req.body);
    const token: any = user.createJWT();
    res.status(201).json({
      user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name
      }, 
      token,
      location: user.location
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
}

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('Please provide all values');
    }
  
    const user = await User.findOne({ email }).select('+password');
    if(!user) {
      throw new Error('Invalid credentials');
    }
  
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
      throw new Error('Invalid credentials');
    }
    user.password = undefined;
  
    const token = user.createJWT();
    res.status(200).json({user, token, location: user.location});
  } catch (error) {
    next(error)
  }
}

const updateUser: RequestHandler = async (req, res) => {
  res.send('update user');
}

const deleteUser: RequestHandler = async (req, res) => {
  await User.deleteMany({});
  res.send('Deleted!');
} 

export { register, login, updateUser, deleteUser };