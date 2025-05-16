// models/Keyword.js
import mongoose from 'mongoose';

const keywordSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Educational', 'Healthcare', 'Wildlife'], // restrict to valid types
    },
    keywords: {
        type: [String], // array of keywords
        required: true,
    },
});

const Keyword = mongoose.model('Keyword', keywordSchema);

export default Keyword;