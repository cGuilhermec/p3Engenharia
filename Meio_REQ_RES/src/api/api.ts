import axios, { AxiosInstance } from 'axios'; 

export const apiPostgres: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001"
});

export const apiMySQL: AxiosInstance = axios.create({
    baseURL: "http://localhost:3002"
});

export const apiMongoDb: AxiosInstance = axios.create({
    baseURL: "http://localhost:3005"
});