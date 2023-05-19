import {Router} from 'express';

const router: Router = Router();

import {createJob, deleteJob, getAllJobs, updateJob, showStats} from '../controllers/jobsController';

//always rember where you put :id
router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;