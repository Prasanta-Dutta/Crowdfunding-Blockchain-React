import { Router } from "express";
import { insertData } from '../controllers/aadhar.controller.js';

const aadharRouter = Router();

aadharRouter.route("/insert-data").post(insertData);

export default aadharRouter;