import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Confirmed', 'InProgress', 'Default'],
    datasets: [
      {
        label: 'No of Projects',
        data: [39, 29, 34],
        backgroundColor: [
          'green',
          'orange',
          'rgb(25, 118, 210)',
        ],
        borderColor: [
          'green',
          'orange',
          'rgb(25, 118, 210)',
        ],
        borderWidth: 1,
      },
    ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Projects Analytics',
    },
  }}

export default function PieChart() {
  return <div style={{width: '310px', height: '310px', padding: '10px', border: '1px solid #ccc'}}><Doughnut
    data={data}
    options={options}
  /></div>;
}
