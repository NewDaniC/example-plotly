// src/GeradorGrafico.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Menu from './components/menu';

const GeradorGrafico = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    startDate: '',
    endDate: '',
    xAxis: 'Data',
    yAxis: 'I',
    station: 'ITAI'
  });

  const width = 1050;
  const height = 550;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { startDate, endDate, xAxis, yAxis, station } = params;

        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const urls = [];

        // Adicionar um dia à data inicial
        start.setDate(start.getDate() + 1);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const year = d.getFullYear();
          const startOfYear = new Date(year, 0, 0);
          const diff = (d - startOfYear) + ((startOfYear.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
          const doy = Math.floor(diff / (1000 * 60 * 60 * 24));
          urls.push(`https://v250y1kckj.execute-api.us-east-1.amazonaws.com/metrics?source=dw&ano=${year}&estacao=${station}&tipo_coleta=ion&doy=${String(doy).padStart(3, '0')}`);
        }

        const fetchAllData = await Promise.all(urls.map(url => axios.get(url)));
        const allApiData = fetchAllData.flatMap(response => response.data.content);

        const satelites = [...new Set(allApiData.map(item => item.satelite))];
        const plots = satelites.map((satelite, index) => {
          const sateliteData = allApiData.filter(item => item.satelite === satelite);
          return {
            x: xAxis === 'Data' ? sateliteData.map(item => `${item.data} ${item.hora}:00`) : sateliteData.map(item => item[xAxis]),
            y: sateliteData.map(item => item[yAxis]),
            type: 'scatter',
            mode: 'lines+markers',
            name: `Satélite ${satelite}`,
            visible: index === 0 ? true : 'legendonly'
          };
        });

        setData(plots);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    };

    fetchData();
  }, [params]);

  const handleGenerate = (newParams) => {
    setParams(newParams);
  };

  return (
    <div>
      <Menu onGenerate={handleGenerate} />
      <Plot
        data={data}
        layout={{ 
          title: 'Gráfico de Métricas por Satélite', 
          xaxis: { title: params.xAxis === 'Data' ? 'Data e Hora' : params.xAxis }, 
          yaxis: { title: params.yAxis },
          width: width, 
          height: height,
          legend: {
            orientation: 'h',
            y: -0.3, // Posiciona a legenda abaixo do gráfico
            x: 0.5,
            xanchor: 'center',
            yanchor: 'top',
            traceorder: 'normal',
            title: {
              text: 'Satelites',
              font: {
                size: 14
              }
            },
            font: {
              size: 12
            },
            tracegroupgap: 5
          }
        }}
      />
    </div>
  );
};

export default GeradorGrafico;





/*
// src/GeradorGrafico.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Menu from './components/menu';

const GeradorGrafico = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    source: 'dw',
    estacao: 'itai',
    tipoColeta: 'ion',
    startDate: '',
    endDate: ''
  });

  const width = 1050;
  const height = 550;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { source, estacao, tipoColeta, startDate, endDate } = params;

        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const urls = [];

        // Adicionar um dia à data inicial
        start.setDate(start.getDate() + 1);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const year = d.getFullYear();
          const start = new Date(year, 0, 0);
          const diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
          const doy = Math.floor(diff / (1000 * 60 * 60 * 24));
          urls.push(`https://v250y1kckj.execute-api.us-east-1.amazonaws.com/metrics?source=${source}&ano=${year}&estacao=${estacao}&tipo_coleta=${tipoColeta}&doy=${String(doy).padStart(3, '0')}`);
        }

        const fetchAllData = await Promise.all(urls.map(url => axios.get(url)));
        const allApiData = fetchAllData.flatMap(response => response.data.content);

        const satelites = [...new Set(allApiData.map(item => item.satelite))];
        const plots = satelites.map((satelite, index) => {
          const sateliteData = allApiData.filter(item => item.satelite === satelite);
          return {
            x: sateliteData.map(item => `${item.data} ${item.hora}:00`),
            y: sateliteData.map(item => item.I),
            type: 'scatter',
            mode: 'lines+markers',
            name: `Satélite ${satelite}`,
            visible: index === 0 ? true : 'legendonly'
          };
        });

        setData(plots);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    };

    fetchData();
  }, [params]);

  const handleGenerate = (newParams) => {
    setParams(newParams);
  };

  return (
    <div>
      <Menu onGenerate={handleGenerate} />
      <Plot
        data={data}
        layout={{ 
          title: 'Teste Gráfico', 
          xaxis: { title: 'Data e Hora' }, 
          width: width, 
          height: height,
          legend: {
            orientation: 'h',
            y: -0.3, // Posiciona a legenda abaixo do gráfico
            x: 0.5,
            xanchor: 'center',
            yanchor: 'top',
            traceorder: 'normal',
            title: {
              text: 'Satelites',
              font: {
                size: 14
              }
            },
            font: {
              size: 12
            },
            tracegroupgap: 5
          }
        }}
      />
    </div>
  );
};

export default GeradorGrafico;
*/