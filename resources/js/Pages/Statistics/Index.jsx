import StatisticsLayout from "@/Layouts/StatisticsLayout";
import { Head } from "@inertiajs/react";
import GenderChart from "./Components/GenderChart";
import ActionsCount from "./Components/ActionsCount";
import ActionsByStatusChartBar from "./Components/ActionStatusBar";
import ActionsByStatusPieChart from "./Components/ActionsStatus";
import PaymentsByActionTypeChart from "./Components/ActionPayments";
export default function Index({ auth, male_count, female_count, actionTypeCounts, actionsByStatus, paymentsByActionType }) {
    return (
        <StatisticsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Statistics </h2>}
        >
            <Head title="Statistics" />
           <section
            className=" py-10 px-16"
           >
                <div
                    className="grid grid-cols-3 min-h-[34em] gap-16"
                >
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
    )
}