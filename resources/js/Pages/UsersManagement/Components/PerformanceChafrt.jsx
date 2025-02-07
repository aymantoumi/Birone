import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function DailyCountsLineChart({ patientsPerDay, actionsPerDay, finishedActionsPerDay, notFinishedActionsPerDay }) {
    const labels = Object.keys(patientsPerDay);

    const patientsData = patientsPerDay ? Object.values(patientsPerDay) : [];
    const actionsData = actionsPerDay ? Object.values(actionsPerDay) : [];
    const finishedData = finishedActionsPerDay ? Object.values(finishedActionsPerDay) : [];
    const notFinishedData = notFinishedActionsPerDay ? Object.values(notFinishedActionsPerDay) : [];

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "Patients",
                data: patientsData,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: "Actions",
                data: actionsData,
                borderColor: '#f44336',
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: "Finished Actions",
                data: finishedData,
                borderColor: '#2196f3',
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: "Not Finished Actions",
                data: notFinishedData,
                borderColor: '#ff9800',
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderWidth: 2,
                fill: true,
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
        <div className='min-h-[35rem]'>
            <Line data={dataChart} options={options} />
        </div>
    );
}
