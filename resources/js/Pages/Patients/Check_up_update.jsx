import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CheckUP({
    auth,
    patient,
    scanners,
    lab_results,
    check_ups,
    medications,
    action_scanners,
    action_medication,
    action_lab_results,
    action_chesk_ups,
    note: initialNote,
}) {
        
    return (
        <PatientsLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    <Link
                        href={route("Patients.show", patient.patient_id)}
                    >
                        {patient.patient.first_name} {patient.patient.last_name}
                    </Link>
                </h2>
            }
        >
            <Head title="Edit Check-up" />


        </PatientsLayout>
    );
}