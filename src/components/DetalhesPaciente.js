import React from 'react';

const DetalhesPaciente = ({ paciente }) => {
    return (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Detalhes do Paciente</h2>
            <p><strong>Nome:</strong> {paciente.nome}</p>
            <p><strong>Idade:</strong> {paciente.idade}</p>
            <p><strong>CPF:</strong> {paciente.cpf}</p>
            <p><strong>RG:</strong> {paciente.rg}</p>
            <p><strong>Data de Nascimento:</strong> {paciente.data_nasc}</p>
            <p><strong>Sexo:</strong> {paciente.sexo}</p>
            <p><strong>Signo:</strong> {paciente.signo}</p>
            <p><strong>Mãe:</strong> {paciente.mae}</p>
            <p><strong>Pai:</strong> {paciente.pai}</p>
            <p><strong>Email:</strong> {paciente.email}</p>
            <p><strong>Endereço:</strong> {paciente.endereco}, {paciente.numero}, {paciente.bairro}, {paciente.cidade}, {paciente.estado}</p>
            <p><strong>Telefone Fixo:</strong> {paciente.telefone_fixo}</p>
            <p><strong>Celular:</strong> {paciente.celular}</p>
            <p><strong>Altura:</strong> {paciente.altura}</p>
            <p><strong>Peso:</strong> {paciente.peso}</p>
            <p><strong>Tipo Sanguíneo:</strong> {paciente.tipo_sanguineo}</p>
            <p><strong>Cor:</strong> {paciente.cor}</p>
        </div>
    );
};

export default DetalhesPaciente;
