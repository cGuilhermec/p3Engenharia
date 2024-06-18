import { MongoClient, Collection } from 'mongodb';


const url = 'mongodb://localhost:27017';
const dbName = 'p3';

export const createConnection = async (): Promise<Collection> => {
    try {

        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);
        return db.collection('clientes');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Unable to connect to the database');
    }
};
