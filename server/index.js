import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connect.js";
import indexRouter from "./routes/routes.js";
import session from "express-session";
import asyncHandler from "./middleware/asyncHandler.js";
import ErrorHandler from "./middleware/ErrorHandler.js";


dotenv.config();

const app = express();


app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get('/', (async (req, res) => {
    // throw new NotFoundException("this is a bad request")
    res.json({
        message: "server is running"
    });
}));

app.use(ErrorHandler);


app.use('/api', indexRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("🚀Server listening on port🚀", PORT);
    });
}).catch(err => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
});