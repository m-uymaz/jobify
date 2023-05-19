"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
// always remember where you put :id
router.route('/register').post(authController_1.register);
router.route('/login').post(authController_1.login);
router.route('/updateUser').patch(authController_1.updateUser);
router.route('/deleteUser').delete(authController_1.deleteUser);
exports.default = router;
