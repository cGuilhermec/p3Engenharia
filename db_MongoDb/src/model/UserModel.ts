import { createConnection } from "../../db/connection";
import { IUser } from "../interfaces/IUser";

export class UserModel {

    async createUser(user: IUser): Promise<void> {

        const client = await createConnection();

        await client.insertOne({
            name: user.name,
            cpf: user.cpf
        });

    };

    async getAllUsers () {

        const client = await createConnection();

         const users = await client.find({}).toArray();

        return users;

    };

};