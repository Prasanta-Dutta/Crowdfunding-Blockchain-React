import dotenv from 'dotenv/config'
import express from 'express';
import { DB_NAME } from './constant.js';
import connectDB from './db/dbConfig.js';
import mongoose from 'mongoose';
import app from './app.js';


connectDB()
    .then((response) => {
        app.listen(process.env.PORT, () => {
            console.log(`I am listining at PORT: ${process.env.PORT} ${DB_NAME}`);
        });
    })
    .catch((err) => {
        console.log(`From index page: ${err}`);
    });
