import { createConnection } from "../../db/connection";
import { IUser } from "../interfaces/IUser";

export class UserModel {

    async createUser(user: IUser): Promise<void> {

        const client = await createConnection();

        await client.query(
            'INSERT INTO users (name, cpf) VALUES ($1, $2)', [user.name, user.cpf]
        );

    };

    async getAllUsers() {

        const client = await createConnection();

        const users = await client.query(
            'SELECT * FROM users'
        );

        return users.rows

    };

};