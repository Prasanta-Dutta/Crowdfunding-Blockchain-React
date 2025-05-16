import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { DB_NAME } from './constant.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
    mongoUrl: `${process.env.DB_URL}/${DB_NAME}`,
    crypto: { secret: process.env.SESSION_SECRET_KEY }, // optional encryption
    autoRemove: 'interval',
    autoRemoveInterval: 10 // minutes
});


app.use(session(
    {
        secret: `${process.env.SESSION_SECRET_KEY}`,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        },
        store: MongoStore.create({ mongoUrl: `${process.env.DB_URL}/${DB_NAME}` })
        // store: sessionStore
    }
));

// Import routes
// import aadharRoute from './routes/aadhar.route.js';
import userRouter from './routes/user.routes.js';
import keywordRouter from './routes/keyword.route.js';


// app.use("/api/aadhar", aadharRoute);
app.use("/api/user", userRouter);
app.use("/api/keyword", keywordRouter);


export default app;