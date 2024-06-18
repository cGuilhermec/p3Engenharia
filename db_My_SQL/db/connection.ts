import mysql2 from 'mysql2/promise'

export const createConnection = async () => {

    const client = mysql2.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE, 
    })

    try {
        return client;
    } catch (error) {
        console.log("Erro ao conectar ao banco: ", error);
        throw error;
    };

};