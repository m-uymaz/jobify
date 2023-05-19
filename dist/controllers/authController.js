"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userAlreadyExists = yield User_1.default.findOne({ email });
    try {
        if (!name || !email || !password) {
            throw new Error('Please provide all values');
        }
        if (userAlreadyExists) {
            throw new Error('User already exists');
        }
        const user = yield User_1.default.create(req.body);
        const token = user.createJWT();
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
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Please provide all values');
        }
        const user = yield User_1.default.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordCorrect = yield user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid credentials');
        }
        user.password = undefined;
        const token = user.createJWT();
        res.status(200).json({ user, token, location: user.location });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('update user');
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteMany({});
    res.send('Deleted!');
});
exports.deleteUser = deleteUser;
