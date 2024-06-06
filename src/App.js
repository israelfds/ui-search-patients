import React, { useState } from 'react';
import BuscaPaciente from './components/BuscaPaciente';
import DetalhesPaciente from './components/DetalhesPaciente';
import GraficoTemporal from './components/GraficoTemporal';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleSearch = (data) => {
    setPacientes(data);
    if (data.length > 0) {
      setPacienteSelecionado(data[0]);
    }
  };

  const handlePacienteSelecionado = (paciente, index) => {
    setPacienteSelecionado(paciente);
    setSelectedItemIndex(index);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Consulta de Pacientes</h1>
        <BuscaPaciente onSearch={handleSearch} />
        {pacientes.length > 0 && (
          <div>
            <h2>Resultados da Busca</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {pacientes.map((paciente, index) => (
                <li
                  key={index}
                  onClick={() => handlePacienteSelecionado(paciente, index)}
                  style={{
                    padding: '10px',
                    marginBottom: '5px',
                    backgroundColor: selectedItemIndex === index ? '#d4d4d4' : '#f4f4f4',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: selectedItemIndex === index ? 'bold' : 'normal',
                  }}
                >
                  {paciente.nome}
                </li>
              ))}
            </ul>
          </div>
        )}
        {pacienteSelecionado && (
          <div>
            <DetalhesPaciente paciente={pacienteSelecionado} />
            <GraficoTemporal paciente={pacienteSelecionado} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
