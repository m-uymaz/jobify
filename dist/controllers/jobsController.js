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
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = exports.updateJob = exports.getAllJobs = exports.deleteJob = exports.createJob = void 0;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('create job');
});
exports.createJob = createJob;
const getAllJobs = (req, res) => {
    res.send('Get all jobs');
};
exports.getAllJobs = getAllJobs;
const updateJob = (req, res) => {
    res.send('Update job');
};
exports.updateJob = updateJob;
const deleteJob = (req, res) => {
    res.send('Delete job');
};
exports.deleteJob = deleteJob;
const showStats = (req, res) => {
    res.send('Show stats');
};
exports.showStats = showStats;
