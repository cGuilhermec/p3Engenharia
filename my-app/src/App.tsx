import { FormEvent, useState, useRef } from 'react';
import './App.css';
import { BtnEnviarReq } from './assets/logic/SendReq';

function App() {

  const { handleRequest, cpflRef, getAll, nameRef, dbRef, downloadLogs } = BtnEnviarReq();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataList, setDataList] = useState<any[]>([]);
  
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleVerDados = async () => {
    const data = await getAll();
    setDataList(data);
    dialogRef.current?.showModal(); // Abre o dialog
  };

  const handleCloseDialog = () => {
    dialogRef.current?.close(); // Fecha o dialog
  };

  return (
    <div className="App">

      <div className="container">

        <div className="inputs">
          <label htmlFor="nome">Nome:</label>
          <input type="text" value={name} id="nome" ref={nameRef} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="inputs">
          <label htmlFor="cpf">CPF:</label>
          <input type="number" value={cpf} id="cpf" ref={cpflRef} onChange={(e) => setCpf(e.target.value)} />
        </div>

        <div className="inputs">
          <label id="list">Escolha o banco para gravar as informações:</label>
          <input id="list" list="my-list" ref={dbRef} type="text" />
        </div>

        <datalist id="my-list">
          <option value="POSTGRES"></option>
          <option value="MY-SQL"></option>
          <option value="MONGODB"></option>
        </datalist>

        <div className="buttons">
          <button onClick={(e: FormEvent) => { e.preventDefault(); handleRequest() }} type="button">Enviar</button>
          <button onClick={(e: FormEvent) => { e.preventDefault(); downloadLogs() }} type="button">Baixar Logs</button>
          <button onClick={(e: FormEvent) => { e.preventDefault(); handleVerDados() }} type="button" id='verDados'>Ver Dados</button>
        </div>

        <dialog id='dialog' ref={dialogRef}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Banco de dados</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.cpf}</td>
                  <td>{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="btn-Fechar">
            <button onClick={handleCloseDialog} id='btnfechar'>Fechar</button>
          </div>
        </dialog>

      </div>

    </div>
  );
}

export default App;
