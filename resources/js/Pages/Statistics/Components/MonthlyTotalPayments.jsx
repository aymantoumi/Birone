import { Line } from 'react-chartjs-2';

export default function DailyPaymentsChart({ paymentsPerDay }) {
    const labels = Object.keys(paymentsPerDay);
    const data = Object.values(paymentsPerDay);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "Payments",
                data: data,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
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
                ticks: {
                    callback: function(value) {
                        return value + ' DH'; 
                    }
                }
            },
        },
    };

    return (
        <div className='min-h-[35rem]'>
            <Line data={dataChart} options={options} />
        </div>
    );
}
