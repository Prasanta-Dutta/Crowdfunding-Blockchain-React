// backend/routes/keywordRoutes.js
import { Router } from 'express';
import Keyword from '../models/keyword.model.js';

const keywordRouter = Router();
// POST /api/match-keywords
keywordRouter.post('/match-keywords', async (req, res) => {
    const { type, text } = req.body;
    try {
        const record = await Keyword.findOne({ type });
        if (!record) return res.status(404).json({ matches: [] });

        const matches = record.keywords.filter(kw =>
            text.toLowerCase().includes(kw.toLowerCase())
        );

        res.json({ matches });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

export default keywordRouter;

