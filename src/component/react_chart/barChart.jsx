import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Workflow Analytics',
        },
    },
    scales: {
        x: {
            beginAtZero: true
        }
    },
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 1,
            borderColor: '#37AFFF'
        },
    },
};

const labels = ['Smart Well', 'MultiZone', 'Open Hole Horizontal', 'Stack Selective', 'Stack Commingle', 'Single CHGP'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Projects count',
            data: [40, 50, 45, 34, 76, 80],
            backgroundColor: 'rgb(25, 118, 210)',
        }
    ],
};

export default function PieChart() {
    return <div style={{ width: '600px', height: '310px', padding: '10px', border: '1px solid #ccc' }}><Bar
        data={data}
        options={options}
    /></div>;
}
