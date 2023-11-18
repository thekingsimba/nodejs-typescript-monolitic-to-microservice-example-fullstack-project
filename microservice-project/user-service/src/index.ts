import express from 'express';
import cors from 'cors';
import {createConnection} from "typeorm";
import {routes} from "./routes";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();


createConnection().then(async () => {

    const app = express();

    app.use(cookieParser());
    app.use(express.json());
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000']
    }));

    routes(app);

    app.listen(8000, () => {
        console.log('listening to port 8000')
    });
});

