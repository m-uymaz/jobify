"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const jobsController_1 = require("../controllers/jobsController");
//always rember where you put :id
router.route('/').post(jobsController_1.createJob).get(jobsController_1.getAllJobs);
router.route('/stats').get(jobsController_1.showStats);
router.route('/:id').delete(jobsController_1.deleteJob).patch(jobsController_1.updateJob);
exports.default = router;
