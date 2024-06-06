import React, { useState } from 'react';

const BuscaPaciente = ({ onSearch }) => {
    const [nome, setNome] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://308.serveblog.net:3001/pacients?nome=${nome}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            onSearch(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                placeholder="Digite o nome do paciente"
                style={{ 
                    padding: '8px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    marginRight: '10px' // Adiciona um espaçamento à direita do input
                }}
            />
            <button 
                onClick={handleSearch}
                style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#007bff', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }}
            >
                Buscar
            </button>
        </div>
    );
};

export default BuscaPaciente;
