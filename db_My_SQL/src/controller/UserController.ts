import { UserModel } from "../model/UserModel";
import { Request, Response } from 'express';

export class UserController {
    
    private static userModel: UserModel = new UserModel();

    public static async create(req: Request, res: Response): Promise<void> {

        const { name, cpf } = req.body;

        try {
            
            await UserController.userModel.createUser({name, cpf});

            res.status(200).json({message: "Usuário criado com sucesso"});

        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro ao criar usuário" });
        };

    };

    public static async getAll(_req: Request, res: Response) {

        try {
            
            const users = await UserController.userModel.getAllUsers();
            res.status(200).json(users);

        } catch (error) {
            console.error("Erro ao obter usuários:", error);
            res.status(500).json({ error: "Erro ao obter usuários" });
        };

    };

}