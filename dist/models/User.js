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
const mongoose_1 = require("mongoose");
// npm i validator, we also need npm @types for validator
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
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
            validator: function () { return validator_1.default.isEmail; },
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
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
// BETTER NOT USE ARROW FUNCTION!
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};
// IMPORTANT, DO NOT USE ARROW FUNCTION!
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare(candidatePassword, this.password);
        return isMatch;
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
