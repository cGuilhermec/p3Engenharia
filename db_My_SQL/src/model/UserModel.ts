import { IUser } from "../interfaces/IUser";
import { createConnection } from "../../db/connection";

export class UserModel {

    async createUser(user: IUser): Promise<void>{

        const client = await createConnection();

        await client.query(
            'INSERT INTO users (name, cpf) VALUES (?, ?)', [user.name, user.cpf]
        );

    };

    async getAllUsers() {

        const client = await createConnection();

        const [users] = await client.query(
            'SELECT * FROM users'
        );

        return users;

    };

};