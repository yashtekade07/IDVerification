import express from 'express';
import {getUser,registerUser,updateUser,deleteUser} from "../controllers/userController.js"
import getHistory from '../controllers/historyController.js';
const router=express.Router();

router.route('/user').get(getUser) // getUser with regex
                     .post(registerUser) // add new user to db
                     .put(updateUser) // update existing details
                     .delete(deleteUser); // delete user
router.route('/history').get(getHistory); // history
export default router;