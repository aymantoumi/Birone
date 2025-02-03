import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GenderChart({ male, female }) {

    const dataChart = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                label: "Gender Counts",
                data: [male, female],
                backgroundColor: [ '#d6eaf8', '#f5b7b1'],
                borderColor: ["#1E6EBB", "#D81B60"],
                borderWidth: 1,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return (
        <div className='min-h-[28em]'>
            <Bar data={dataChart} options={options} />
        </div>
    );
}