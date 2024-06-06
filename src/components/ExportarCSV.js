import React from 'react';

const ExportarCSV = ({ dados }) => {
    const handleClick = () => {
        if (!dados || dados.length === 0) {
            console.error('Dados do gráfico não estão definidos ou vazios.');
            return;
        }

        // Lógica para exportar os dados para um arquivo CSV
        const csvContent = 'data:text/csv;charset=utf-8,';
        const header = Object.keys(dados[0]).join(',') + '\n';
        const rows = dados.map(obj => Object.values(obj).join(',')).join('\n');

        const csv = csvContent + header + rows;
        const encodedUri = encodeURI(csv);

        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'dados.csv');
        document.body.appendChild(link);

        link.click();
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <button style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
            }} onClick={handleClick}>Exportar para CSV</button>
        </div>
    );
};

export default ExportarCSV;
