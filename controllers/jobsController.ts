import {RequestHandler} from "express";

const createJob: RequestHandler = async (req, res) => {
    res.send('create job')
}

const getAllJobs: RequestHandler = (req, res) => {
    res.send('Get all jobs');
}

const updateJob: RequestHandler = (req, res) => {
    res.send('Update job');
}

const deleteJob: RequestHandler = (req, res) => {
    res.send('Delete job');
}

const showStats: RequestHandler = (req, res) => {
    res.send('Show stats');
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }