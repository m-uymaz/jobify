import {Router} from "express";

const router: Router = Router();

import { register, login, updateUser, deleteUser } from "../controllers/authController";

// always remember where you put :id
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);
router.route('/deleteUser').delete(deleteUser);

export default router;