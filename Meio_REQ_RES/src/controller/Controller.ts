import { Response, Request } from "express";
import { apiMongoDb, apiMySQL, apiPostgres } from "../api/api";

export class Controller {

    public static async getAllPostgres(_req: Request, res: Response) {

        try {
            
            const users = await apiPostgres.get('/get-users');
            res.status(200).json(users.data);

        } catch (error) {
            
            console.error("Erro ao obter usuários de Postgres:", error);
            res.status(500).json({ error: "Erro ao obter usuários" });

        };

    };

    public static async getAllMySQL(_req: Request, res: Response) {

        try {
            
            const users = await apiMySQL.get('/get-users');
            res.status(200).json(users.data);

        } catch (error) {
            console.error("Erro ao obter usuários de MySQL:", error);
            res.status(500).json({ error: "Erro ao obter usuários" });

        };

    };

    public static async getAllMongoDb(_req: Request, res: Response) {

        try {
            
            const users = await apiMongoDb.get('/get-users');
            res.status(200).json(users.data);

        } catch (error) {
            console.error("Erro ao obter usuários de MySQL:", error);
            res.status(500).json({ error: "Erro ao obter usuários" });

        };

    };

    public static async postUserPostgres(req: Request, res: Response): Promise<void> {

        const { name, cpf } = req.body;

        try {

            await apiPostgres.post('/create-user',
                {
                    name: name,
                    cpf: cpf,
                });

                res.status(200).json({messagee: "Usuário Criado com Sucesso no Postgres!"})
            
        } catch (error) {
            console.error("Erro ao cadastrar usuário no Postgres:", error);
            res.status(500).json({ error: "Erro ao criar o usuário no Postgres" });
        };

    };

    public static async postUserMySQL(req: Request, res: Response): Promise<void> {

        const { name, cpf } = req.body;

        try {
            
            await apiMySQL.post('/create-user', 
                {
                    name: name,
                    cpf: cpf,
                }

                )
            res.status(200).json({message: "Usuário Criado com Sucesso no MySQL!"});
                
        } catch (error) {
            console.error("Erro ao cadastrar usuário no MySQL:", error);
            res.status(500).json({ error: "Erro ao criar o usuário no MySQL" });
        }

    };

    public static async postUserMongoDb(req: Request, res: Response): Promise<void> {

        const { name, cpf } = req.body;

        try {
            
            await apiMySQL.post('/create-user', 
                {
                    name: name,
                    cpf: cpf,
                }

                )
            res.status(200).json({message: "Usuário Criado com Sucesso no MongoDB!"});
                
        } catch (error) {
            console.error("Erro ao cadastrar usuário no MySQL:", error);
            res.status(500).json({ error: "Erro ao criar o usuário no MySQL" });
        }

    };

};