import Clock from '@/Components/Clock';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DailyCountsLineChart from './Components/MonthlyChart';

export default function Dashboard({ auth, patientsPerDay, actionsPerDay, finishedActionsPerDay, notFinishedActionsPerDay }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-sky-200 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg px-10 py-14 ">
                        <Clock />
                        <DailyCountsLineChart
                            patientsPerDay={patientsPerDay}
                            actionsPerDay={actionsPerDay}
                            finishedActionsPerDay={finishedActionsPerDay}
                            notFinishedActionsPerDay={notFinishedActionsPerDay}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
