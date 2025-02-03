import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PaymentsByActionTypeChart({ paymentsByActionType }) {
    const labels = paymentsByActionType.map(item => item.action_type.action);
    const paymentData = paymentsByActionType.map(item => item.total_payment);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "Total Payment",
                data: paymentData,
                backgroundColor: '#42a5f5', // Blue for payments
                borderColor: '#1e88e5',
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
        <div className='max-h-[35rem]'>
            <Bar data={dataChart} options={options} />
        </div>
    );
}
