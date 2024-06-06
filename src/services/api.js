import axios from 'axios';

const API_URL = 'https://308.serveblog.net:3001'; // URL da sua API

const buscarPacientesPorNome = async (nome) => {
    try {
        const response = await axios.get(`${API_URL}/pacients?nome=${nome}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        throw error;
    }
};

export { buscarPacientesPorNome };
