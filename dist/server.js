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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
//db and auth
const connect_1 = __importDefault(require("./db/connect"));
//middleware
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
//routers
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jobsRoutes_1 = __importDefault(require("./routes/jobsRoutes"));
if (process.env.NODE_ENV !== 'production') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/jobs', jobsRoutes_1.default);
app.use(errorHandler_1.default);
app.use('*', (req, res) => {
    res.status(404).send('Route does exist... :(');
});
const PORT = process.env.PORT;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
    }
    catch (err) {
        console.log(err);
    }
});
start();
