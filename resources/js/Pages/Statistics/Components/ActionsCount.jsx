import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ActionsCount({ actionTypeCounts }) 
{
    
    const labels = actionTypeCounts.map(item => item.action_type.action);
    const data = actionTypeCounts.map(item => item.total);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "Action Type Counts",
                data: data,
                backgroundColor: ['#f5b7b1', '#d6eaf8', '#aed6f1', '#f9e79f', '#a9dfbf'], 
                borderColor: ['#1E6EBB', '#D81B60', '#2874A6', '#B7950B', '#1D8348'], 
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