import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




const data = {
    labels: ['Direct ', 'Social ', 'Referral'],
    datasets: [
        {
            label: '# of Votes',
            data: [55, 35, 15],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
        },
    ],
};
function DoughnutChart() {
    return (

        <Doughnut data={data} />

    )
}

export default DoughnutChart    