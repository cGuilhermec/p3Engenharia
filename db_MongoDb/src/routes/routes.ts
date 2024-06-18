import express from 'express';
import { UserController } from '../controller/UserController';


export const router = express.Router();

router.post('/create-user', UserController.create);
router.get('/get-users', UserController.getAll);