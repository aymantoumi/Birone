import ResultsLayout from "@/Layouts/ResultsLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import UpdateDeleteMedication from "./Components/UpdateMedications";
import UpdateDeleteCTScans from "./Components/UpdateCTScans";
import UpdateLabResults from "./Components/UpdateLabResults";
import UpdateRuslt from "./Components/UpdateResult";

export default function Main
    ({
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
        note,
    }) {
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [showActionMedicationModal, setShowActionMedicationModal] = useState(false);
    const [selectCTScan, setSelectedCTscan] = useState(null)
    const [showActionCTScanModal, setShowActionCTScanModal] = useState(false)
    const [selectedLabResult, setSelectedLabResult] = useState(null)
    const [showLabResultModal, setShowLabResultModal] = useState(false)
    const [selectedResult, setSelectedResult] = useState(null)
    const [showResultModal, setShowResultModal] = useState(false)

    const handleEditResult = (item) => {
        setSelectedResult({
            id: item.id,
            check_up_id: item.check_up_id
        });
        setShowResultModal(true)
    }
    const handleCloseResult = () => {
        setShowResultModal(false)
        setSelectedResult(null)
    }

    const handleEditLabResult = (item) => {
        setSelectedLabResult({
            id: item.id,
            lab_result_id: item.lab_result_id
        });
        setShowLabResultModal(true)
    }
    const handleCloseLabResult = () => {
        setShowLabResultModal(false)
        selectedLabResult(null)
    }
    const handleEditMedicationClick = (item) => {
        setSelectedMedication({
            id: item.id,
            medication_id: item.medication_id
        });
        setShowActionMedicationModal(true);
    }

    const handleCloseMedication = () => {
        setShowActionMedicationModal(false);
        setSelectedMedication(null);
    }

    const handlEditActionCTScans = (item) => {
        setSelectedCTscan({
            id: item.id,
            scanner_id: item.scanner_id
        })
        setShowActionCTScanModal(true)
    }

    const handleCloseCTScans = () => {
        setShowActionCTScanModal(false)
        setSelectedCTscan(null)
    }


    return (
        <ResultsLayout
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
            <Head title={patient.patient.first_name + ' ' + patient.patient.last_name} />

            <section
                className="px-24 py-8 flex flex-col gap-8"
            >
                <section
                    className="dark:bg-gray-800 rounded-lg px-4 py-2 flex flex-wrap justify-between "
                >

                    <div className="dark:text-gray-100 py-2 px-6 min-w-[16rem]">
                        <span className="text-2xl font-bold">
                            Medications
                        </span>
                        <div className="px-4 text-lg">
                            <ul className=" list-item list-disc">
                                {
                                    action_medication.map((item, index) => (
                                        <li key={index} >
                                            <div className="space-x-3">
                                                <span>
                                                    {item.medication.medication}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEditMedicationClick(item)}
                                                    className="hover:text-blue-700"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="dark:text-gray-100 py-2 px-6 min-w-[16rem]">
                        <span className="text-2xl font-bold">
                            CT Scans
                        </span>
                        <div className="px-4 text-lg">
                            <ul className=" list-item list-disc">
                                {
                                    action_scanners.map((item, index) => (
                                        <li key={index} >
                                            <div className="space-x-3">
                                                <span>
                                                    {item.scanner.scan}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handlEditActionCTScans(item)}
                                                    className="hover:text-blue-700"
                                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="dark:text-gray-100 py-2 px-6 min-w-[16rem]">
                        <span className="text-2xl font-bold">
                            Laboratory Results
                        </span>
                        <div className="px-4 text-lg">
                            <ul className=" list-item list-disc">
                                {
                                    action_lab_results.map((item, index) => (
                                        <li key={index} >
                                            <div className="space-x-3">
                                                <span>
                                                    {item.lab_result.lab_results}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEditLabResult(item)}
                                                    className="hover:text-blue-700"
                                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="dark:text-gray-100 py-2 px-6 min-w-[16rem]">
                        <span className="text-2xl font-bold">
                            Check-up
                        </span>
                        <div className="px-4 text-lg">
                            <ul className=" list-item list-disc">
                                {
                                    action_chesk_ups.map((item, index) => (
                                        <li key={index} >
                                            <div className="space-x-3">
                                                <span>
                                                    {item.check_up.check_up}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEditResult(item)}
                                                    className="hover:text-blue-700"
                                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <form method="POST" className="flex flex-col">
                        <label htmlFor="note" className="dark:text-gray-100 font-extrabold text-2xl">Note</label>
                        <textarea
                            name="note"
                            id="note"
                            rows="15"
                            className="rounded-xl"
                            value={note.note}
                        >
                        </textarea>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4 max-w-fit"
                        >
                            update
                        </button>
                    </form>
                </section>
            </section>

            {showActionMedicationModal && selectedMedication && (
                <UpdateDeleteMedication
                    data={selectedMedication}
                    medication={medications}
                    onClose={handleCloseMedication}
                />
            )}
            {showActionCTScanModal && selectCTScan && (
                <UpdateDeleteCTScans
                    data={selectCTScan}
                    CTScans={scanners}
                    onClose={handleCloseCTScans}
                />
            )}

            {showLabResultModal && selectedLabResult && (
                <UpdateLabResults
                    data={selectedLabResult}
                    labResults={lab_results}
                    onClose={handleCloseLabResult}
                />
            )}

            {showResultModal && selectedResult && (
                <UpdateRuslt
                    data={selectedResult}
                    check_up={check_ups}
                    onClose={handleCloseResult}
                />
            )}

        </ResultsLayout>
    )
}