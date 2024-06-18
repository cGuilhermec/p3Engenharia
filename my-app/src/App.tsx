import { FormEvent, useState } from 'react';
import './App.css';
import { BtnEnviarReq } from './assets/logic/SendReq';


function App() {

  const {handleRequest, cpflRef, getAll, nameRef, dbRef, downloadLogs} = BtnEnviarReq();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataList, setDataList] = useState<any[]>([]);

   const handleVerDados = async () => {
        const data = await getAll();
        setDataList(data);
    };

  return (
    <div className="App">

      <label htmlFor="nome">Nome:</label>
      <input type="text" value={name} id="nome" ref={nameRef} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="cpf">CPF:</label>
      <input type="number" value={cpf} id="cpf" ref={cpflRef} onChange={(e) => setCpf(e.target.value)} />

      <label id="list">Escolha o banco para gravar as informações:</label>
      <input id="list" list="my-list" ref={dbRef} type="text" />
      <datalist id="my-list">
        <option  value="POSTGRES"></option>
        <option  value="MY-SQL"></option>
        <option  value="MONGODB"></option>
      </datalist>

      <button onClick={(e: FormEvent) => {e.preventDefault(); handleRequest()}} type="button"> Enviar</button>
      <button onClick={(e: FormEvent) => { e.preventDefault(); downloadLogs() }} type="button"> Baixar Logs</button>
      <button onClick={(e: FormEvent) => { e.preventDefault(); handleVerDados() }} type="button"> Ver Dados</button>

        <ul>
            {dataList.map((item, index) => (
                <li key={index}>
                    {item.name} - {item.cpf} ({item.source})
                </li>
            ))}
        </ul>
        
    </div>
  );
}

export default App;
