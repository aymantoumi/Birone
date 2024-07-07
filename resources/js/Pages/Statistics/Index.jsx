import StatisticsLayout from "@/Layouts/StatisticsLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth }) {
    return (
        <StatisticsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Statistics </h2>}
        >
            <Head title="Statistics" />
           <section>
                <h1>Hello Statistics</h1>
           </section>
        </StatisticsLayout>
    )
}