import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const GraficoTemporal = ({ paciente }) => {
    const [typeIndice, setTypeIndice] = useState('pulmonar');
    const [dataInicial, setDataInicial] = useState('01/01/2021');
    const [dataFinal, setDataFinal] = useState('31/12/2021');
    const [chartData, setChartData] = useState(null);

    const handleSearch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://308.serveblog.net:3001/indiceCpfDate?cpf=${paciente.cpf}&typeIndice=${typeIndice}&dateInicial=${dataInicial}&dateFinal=${dataFinal}`);
            const data = await response.json();
    
            // Processando os dados para o gráfico
            const sortedData = data.conteudo
                .flatMap(indiceArray => indiceArray.map(indiceData => ({ date: new Date(indiceData.date), indice: parseFloat(indiceData.indice) })))
                .sort((a, b) => a.date - b.date);
    
            const labels = sortedData.map(indiceData => `${indiceData.date.toLocaleDateString()} ${indiceData.date.toLocaleTimeString()}`);
            const values = sortedData.map(indiceData => indiceData.indice);
    
            // Configurando os dados do gráfico
            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: `Índice ${typeIndice === 'pulmonar' ? 'Pulmonar' : 'Cardíaco'}`,
                        data: values,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            };
    
            setChartData(chartData);
        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error);
        }
    };
    
    
    

    const handleExportToCSV = () => {
        if (!chartData) return;

        const csvContent = 'data:text/csv;charset=utf-8,';
        const header = `Date,Indice ${typeIndice === 'pulmonar' ? 'Pulmonar' : 'Cardíaco'}\n`;
        const rows = chartData.labels.map((label, index) => `${label},${chartData.datasets[0].data[index]}`).join('\n');

        const csv = csvContent + header + rows;
        const encodedUri = encodeURI(csv);

        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'dados.csv');
        document.body.appendChild(link);

        link.click();
    };

    if (!chartData) {
        return <p style={{ marginBottom: '20px' }}>Carregando dados do gráfico...</p>;
    }

    return (
        <div>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Gráfico Temporal - Índice {typeIndice === 'pulmonar' ? 'Pulmonar' : 'Cardíaco'}</h2>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>
                    Tipo de Índice:
                    <select value={typeIndice} onChange={(e) => setTypeIndice(e.target.value)} style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px' }}>
                        <option value="pulmonar">Pulmonar</option>
                        <option value="cardiaco">Cardíaco</option>
                    </select>
                </label>
                <label style={{ marginRight: '10px' }}>
                    Data Inicial:
                    <input type="text" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px' }} />
                </label>
                <label style={{ marginRight: '10px' }}>
                    Data Final:
                    <input type="text" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px' }} />
                </label>
                <button onClick={handleSearch} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Buscar Gráfico</button>
                <button onClick={handleExportToCSV} style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Exportar para CSV</button>
            </div>
            <Line data={chartData} />
        </div>
    );
};

export default GraficoTemporal;
