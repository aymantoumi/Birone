import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, useForm } from "@inertiajs/react";

export default function EditCheckUp({ auth, patient, scanners, lab_results, check_ups, action_scanners, action_medication, action_lab_results, action_chesk_ups }) {
    console.log(action_lab_results);

    const { data: actionData, setData: setCheckUpData, post: postCheckUpData, processing: checkUpProcessing, error: checkError } = useForm({
        action_id: '',
        // CT Scans
        deleteScans: [],
        updateScans: [],
        insertScans: [],
        // Lab Results
        deleteLabResults: [],
        updateLabResults: [],
        insertLabResults: [],
        // Mediactions
        deleteMedication: [],
        updateMedication: [],
        insertMedication: [],
        // Check-ups
        deleteCheckUps: [],
        updateCheckUps: [],
        insertCheckUps: [],
        Notes: ''
    })
    const HandlMedicationDeletingList = (medication) => {
        console.log(medication);
    }



    return (
        <PatientsLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {patient.patient.first_name} {patient.patient.last_name}
                </h2>
            }
        >
            <section
                className="flex flex-col px-20 py-10"
            >

                <form method="post">
                    {/* existing data */}
                    <div
                        className="dark:bg-gray-800 dark:text-cyan-100 flex gap-6 rounded-lg py-8 px-24"
                    >
                        <div>
                            <span
                                className="font-extrabold text-cyan-600 text-2xl"
                            >
                                Medications
                            </span>
                            <ul className="list-disc">
                                {action_medication.map((item, index) => (
                                    <li key={index}>
                                        <span>{item.medication.medication}</span>
                                        <button
                                            className="text-red-500"
                                            onClick={() => HandlMedicationDeletingList(item.action_id)}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <span
                                className="font-extrabold text-cyan-600 text-2xl"
                            >
                                Check ups
                            </span>
                            <ul>
                                {action_chesk_ups.map((item, index) => (
                                    <li key={index}> {item.check_up.check_up} </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <span
                                className="font-extrabold text-cyan-600 text-2xl"
                            >
                                CT scans
                            </span>
                            <ul>
                                {action_scanners.map((item, index) => (
                                    <li key={index} >{item.scanner.scan}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <span
                                className="font-extrabold text-cyan-600 text-2xl"
                            >
                                Laboratory Results
                            </span>
                            <ul>
                                {action_lab_results.map((item, index) => (
                                    <li key={index} >{item.lab_result.lab_results}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
            </section>
            <Head title="Edit Check-up" />
        </PatientsLayout>
    );
}