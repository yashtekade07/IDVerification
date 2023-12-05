import express from 'express';
import {getUser,registerUser,updateUser,deleteUser} from "../controllers/userController.js"
import getHistory from '../controllers/historyController.js';
const router=express.Router();

router.route('/user').get(getUser)
                     .post(registerUser)
                     .put(updateUser)
                     .delete(deleteUser);
router.route('/history').get(getHistory);
export default router;