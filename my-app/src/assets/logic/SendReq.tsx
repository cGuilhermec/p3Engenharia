import { useRef, useState } from "react";
import { api } from "../api/api";


export const BtnEnviarReq = () => {

    const nameRef = useRef<HTMLInputElement | null>(null);
    const cpflRef = useRef<HTMLInputElement | null>(null);
    const dbRef  = useRef<HTMLInputElement | null>(null);

    const currentDateTime = new Date().toLocaleString();

    const [logs, setLogs] = useState<string[]>([]);

    const handleRequest = async () =>{
      if (
        !nameRef.current?.value ||
        !cpflRef.current?.value
      ) {
        return alert("Complete todos os campos, antes de enviar!");
      } 
      
      let message = "";
      
      if(dbRef.current?.value === "POSTGRES") {
        message = `${currentDateTime} - horas inseriu no banco: POSTGRES...`;

        const response = await api.post('/users-postgres', {name: nameRef.current?.value, cpf: cpflRef.current?.value});

        if(response.status === 200) {
            alert("Requisição enviada com sucesso para o Postgres!")
        } else {
            alert(response.data.value)
        }
        

      } else if(dbRef.current?.value === "MY-SQL") {
        message = `${currentDateTime} - horas inseriu no banco: MY-SQL...`;

        const response = await api.post('/users-mysql', {name: nameRef.current?.value, cpf: cpflRef.current?.value});

        if(response.status === 200) {
            alert("Requisição enviada com sucesso para o My-SQL!");
        } else {
            alert(response.data.value);
        }


      } else if(dbRef.current?.value === "MONGODB") {
        message = `${currentDateTime} - horas inseriu no banco: MongoDB...`;

        const response = await api.post('/users-mongodb', {name: nameRef.current?.value, cpf: cpflRef.current?.value});

        if(response.status === 200) {
            alert("Requisição enviada com sucesso para o MongoDB!");
        } else {
            alert(response.data.value);
        }

      }

      if (message) {
             setLogs(prevLogs => [...prevLogs, message]);
         }
      
      };


    const getAll = async () => {
    try {
        const infos: any[] = [];

        // Busca dados do PostgreSQL
        try {
            const responsePostgres = await api.get('/users-postgres');
            if (responsePostgres.data) {
                responsePostgres.data.forEach((item: any) => {
                    infos.push({ ...item, source: "POSTGRES" });
                });
            } else {
                console.log("Não há dados válidos retornados do PostgreSQL");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do PostgreSQL:", error);
        }

        // Busca dados do MySQL
        try {
            const responseMySql = await api.get('/users-mysql');
            if (responseMySql.data) {
                responseMySql.data.forEach((item: any) => {
                    infos.push({ ...item, source: "MYSQL" });
                });
            } else {
                console.log("Não há dados válidos retornados do MySQL");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do MySQL:", error);
        }

        // Busca dados do MongoDB
        try {
            const responseMongoDB = await api.get('/users-mongodb');
            if (responseMongoDB.data) {
                responseMongoDB.data.forEach((item: any) => {
                    infos.push({ ...item, source: "MongoDB" });
                });
            } else {
                console.log("Não há dados válidos retornados do MongoDB");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do MongoDB:", error);
        }

        console.log("Todos os dados:", infos);
        return infos;
    } catch (error) {
        console.error("Erro ao buscar todos os dados:", error);
        return [];
    }
};


    const downloadLogs = () => {
        setLogs(prevLogs => [...prevLogs, `${currentDateTime} - horas solicitou os logs...`]);
        const blob = new Blob([logs.join("\n")], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'log.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return {handleRequest, downloadLogs, getAll, nameRef, cpflRef, dbRef}

}