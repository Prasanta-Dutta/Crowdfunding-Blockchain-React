// backend/routes/keywordRoutes.js
import { Router } from 'express';
import { matchKeyword } from '../controllers/keyword.controller.js';

const keywordRouter = Router();
// POST /api/match-keywords
keywordRouter.post('/match-keywords', matchKeyword);

export default keywordRouter;

