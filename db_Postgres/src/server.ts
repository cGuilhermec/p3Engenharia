import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/routes";
import cors from 'cors';

dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () =>{
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});