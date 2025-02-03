import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ActionsByStatusPieChart({ actionsByStatus }) {
    const labels = ['Finished', 'Not Finished'];
    const finishedTotal = actionsByStatus.filter(item => item.Status).reduce((sum, item) => sum + item.total, 0);
    const notFinishedTotal = actionsByStatus.filter(item => !item.Status).reduce((sum, item) => sum + item.total, 0);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "Actions Status",
                data: [finishedTotal, notFinishedTotal],
                backgroundColor: ['#4caf50', '#f44336'], // Green for finished, Red for not finished
                borderColor: ['#388e3c', '#d32f2f'],
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className='max-h-[35rem]'>
            <Pie data={dataChart} />
        </div>
    );
}
