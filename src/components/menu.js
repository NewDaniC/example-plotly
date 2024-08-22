// src/components/menu.js
import React, { useState } from 'react';
import Strings from './Strings';

const Menu = ({ onGenerate }) => {
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2020-01-02');
  const [xAxis, setXAxis] = useState('Data');
  const [yAxis, setYAxis] = useState('I');
  const [station, setStation] = useState('ITAI');

  const handleGenerateClick = () => {
    onGenerate({ startDate, endDate, xAxis, yAxis, station });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around bg-white p-6 rounded-lg shadow-md space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex flex-col items-start w-full lg:w-1/3">
        <label className="mb-2 text-gray-700">Data de Início:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border-2 border-black mb-4 p-2 rounded-md w-full"
        />
        <div className="mb-2 text-gray-700">Eixo X:</div>
        <div className="space-y-2">
          {['Data', 'I (atraso ionosférico)', 'Fp (índice de irregularidades)', 'ROTI (índice de irregularidades)', 'g (gradiente ionosférico)'].map((label) => (
            <label key={label} className="block">
              <input
                type="radio"
                value={label.split(' ')[0]}
                checked={xAxis === label.split(' ')[0]}
                onChange={() => setXAxis(label.split(' ')[0])}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start w-full lg:w-1/3">
        <label className="mb-2 text-gray-700">Data de Fim:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border-2 border-black mb-4 p-2 rounded-md w-full"
        />
        <div className="mb-2 text-gray-700">Eixo Y:</div>
        <div className="space-y-2">
          {['I (atraso ionosférico)', 'Fp (índice de irregularidades)', 'ROTI (índice de irregularidades)', 'g (gradiente ionosférico)'].map((label) => (
            <label key={label} className="block">
              <input
                type="radio"
                value={label.split(' ')[0]}
                checked={yAxis === label.split(' ')[0]}
                onChange={() => setYAxis(label.split(' ')[0])}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start w-full lg:w-1/3">
        <div className="mb-2 text-gray-700">Estação:</div>
        <div className="space-y-2">
          {['ITAI', 'PRCV', 'MSMN'].map((label) => (
            <label key={label} className="block">
              <input
                type="radio"
                value={label}
                checked={station === label}
                onChange={() => setStation(label)}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
        <button onClick={handleGenerateClick} className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-lg w-full">
          {Strings.buttonMetricasPage1}
        </button>
      </div>
    </div>
  );
};

export default Menu;




/*
// src/components/menu.js
import React, { useState } from 'react';

const Menu = ({ onGenerate }) => {
  const [source, setSource] = useState('dw');
  const [estacao, setEstacao] = useState('itai');
  const [tipoColeta, setTipoColeta] = useState('ion');
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2020-01-02');

  const handleGenerateClick = () => {
    onGenerate({ source, estacao, tipoColeta, startDate, endDate });
  };

  return (
    <div>
      <label>
        Source:
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="dl">dl</option>
          <option value="dw">dw</option>
        </select>
      </label>
      <label>
        Estação:
        <select value={estacao} onChange={(e) => setEstacao(e.target.value)}>
          <option value="guai">guai</option>
          <option value="itai">itai</option>
          <option value="msm">msm</option>
          <option value="prcl">prcl</option>
          <option value="prcv">prcv</option>
          <option value="prur">prur</option>
        </select>
      </label>
      <label>
        Tipo Coleta:
        <select value={tipoColeta} onChange={(e) => setTipoColeta(e.target.value)}>
          <option value="gts">gts</option>
          <option value="ion">ion</option>
        </select>
      </label>
      <label>
        Data Inicial:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        Data Final:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <button onClick={handleGenerateClick}>Gerar Gráfico</button>
    </div>
  );
};

export default Menu;
*/