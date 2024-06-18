import express from "express";
import { Controller } from "../controller/Controller";

export const router = express.Router();

router.get('/users-postgres', Controller.getAllPostgres);
router.get('/users-mysql', Controller.getAllMySQL);
router.get('/users-mongodb', Controller.getAllMongoDb);

router.post('/users-postgres', Controller.postUserPostgres);
router.post('/users-mysql', Controller.postUserMySQL);
router.post('/users-mongodb', Controller.postUserMongoDb);