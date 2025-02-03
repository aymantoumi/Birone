import { useState } from 'react';
import StatisticsLayout from "@/Layouts/StatisticsLayout";
import { Head, router } from "@inertiajs/react";
import GenderChart from "./Components/GenderChart";
import ActionsCount from "./Components/ActionsCount";
import ActionsByStatusChartBar from "./Components/ActionStatusBar";
import ActionsByStatusPieChart from "./Components/ActionsStatus";
import PaymentsByActionTypeChart from "./Components/ActionPayments";

export default function Index({ auth, male_count, female_count, actionTypeCounts, actionsByStatus, paymentsByActionType }) {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleDateChange = () => {
        const queryParams = {};
        if (fromDate) queryParams.from = fromDate;
        if (toDate) queryParams.to = toDate;

        router.get(route('Statistics.index'), queryParams, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <StatisticsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Statistics</h2>}
        >
            <Head title="Statistics" />
            <section className="py-10 px-16">
                <div className="flex gap-4 mb-4">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="rounded-lg"
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="rounded-lg"
                    />
                    <button onClick={handleDateChange} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Filter
                    </button>
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 grid grid-cols-3 min-h-[34em] gap-16 py-4 px-8 rounded-lg">
                    <GenderChart female={female_count} male={male_count} />
                    <ActionsCount actionTypeCounts={actionTypeCounts} />
                    <ActionsByStatusChartBar actionsByStatus={actionsByStatus} />
                    <div className="col-span-3 grid grid-cols-2">
                        <ActionsByStatusPieChart actionsByStatus={actionsByStatus} />
                        <PaymentsByActionTypeChart paymentsByActionType={paymentsByActionType} />
                    </div>
                </div>
            </section>
        </StatisticsLayout>
    );
}