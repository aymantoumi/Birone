import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ActionsByStatusChartBar({ actionsByStatus }) {
    const labels = [...new Set(actionsByStatus.map(item => item.action_type.action))];
    const finishedData = actionsByStatus.filter(item => item.Status).map(item => item.total);
    const notFinishedData = actionsByStatus.filter(item => !item.Status).map(item => item.total);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "Finished",
                data: finishedData,
                backgroundColor: '#4caf50', // Green for finished
                borderColor: '#388e3c',
                borderWidth: 1,
            },
            {
                label: "Not Finished",
                data: notFinishedData,
                backgroundColor: '#f44336', // Red for not finished
                borderColor: '#d32f2f',
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Bar data={dataChart} options={options} />
        </div>
    );
}
