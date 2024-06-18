import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

export const createConnection = async () => {

    const client = new Pool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })

    await client.connect();

    try {
        await client.connect();
        return client;
    } catch (error) {
        console.log("Erro ao conectar ao banco: ", error);
        throw error;
    };

};