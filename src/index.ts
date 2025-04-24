import express, {Express,Request,Response} from "express";
import { PORT } from "./secret";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import { errorMiddleware } from "./middleware/errors";
import { signupSchema } from "./schema/user";


const app:Express=express();
var cors=require('cors');

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true })); 

app.use("/",rootRouter);
export const prismaClient= new PrismaClient({
    log: ['query'] 
});

const swaggerDocument:any = require('../swagger_output.json');
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

