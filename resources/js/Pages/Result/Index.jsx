import ResultsLayout from "@/Layouts/ResultsLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import UpdateDeleteMedication from "./Components/UpdateMedications";
import UpdateDeleteCTScans from "./Components/UpdateCTScans";
import UpdateLabResults from "./Components/UpdateLabResults";
import UpdateRuslt from "./Components/UpdateResult";
import NoteUpdate from "./Components/UpdateNote";
import InsertMedication from "./Components/InsertMedication";
import InsertLabResult from "./Components/InsertLabResults";
import InsertScanner from "./Components/InsertCTScans";
import InsertCheckUpResult from "./Components/InserCheckup";

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
        resultId,
    }) {
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [showActionMedicationModal, setShowActionMedicationModal] = useState(false);
    const [selectCTScan, setSelectedCTscan] = useState(null)
    const [showActionCTScanModal, setShowActionCTScanModal] = useState(false)
    const [selectedLabResult, setSelectedLabResult] = useState(null)
    const [showLabResultModal, setShowLabResultModal] = useState(false)
    const [selectedResult, setSelectedResult] = useState(null)
    const [showResultModal, setShowResultModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null);
    const [showNoteModal, setShowNoteModal] = useState(false);
    // The insertion modals logic
    const [showInsertMedication, setShowInsertMedication] = useState(false)
    const [showInsertCTScans, setShowInsertCTScans] = useState(false)
    const [showInsertLabResult, setShowInsertLabResult] = useState(false)
    const [showInsertCheckup, setShowInsertCheckup] = useState(false)

    const handelInserCheckup = () => {
        setShowInsertCheckup(true)
    }
    const handelCloseInsertCheckup = () => {
        setShowInsertCheckup(false)
    }
    const handelInserMedication = () => {
        setShowInsertMedication(true)
    }
    const handelCloseInsertMedication = () => {
        setShowInsertMedication(false)
    }
    const handelInserCTScans = () => {
        setShowInsertCTScans(true)
    }
    const handelCloseInserCTScans = () => {
        setShowInsertCTScans(false)
    }
    const handelInserLabResult = () => {
        setShowInsertLabResult(true)
    }
    const handelCloseInserLabResult = () => {
        setShowInsertLabResult(false)
    }

    const handelEditNote = (item) => {
        setSelectedNote(item);
        setShowNoteModal(true);
    };

    const handelCloseNote = () => {
        setShowNoteModal(false);
        setSelectedNote(null);
    };

    const handelEditResult = (item) => {
        setSelectedResult({
            id: item.id,
            check_up_id: item.check_up_id
        });
        setShowResultModal(true)
    }
    const handelCloseResult = () => {
        setShowResultModal(false)
        setSelectedResult(null)
    }

    const handelEditLabResult = (item) => {
        setSelectedLabResult({
            id: item.id,
            lab_result_id: item.lab_result_id
        });
        setShowLabResultModal(true)
    }
    const handelCloseLabResult = () => {
        setShowLabResultModal(false)
        selectedLabResult(null)
    }
    const handelEditMedicationClick = (item) => {
        setSelectedMedication({
            id: item.id,
            medication_id: item.medication_id
        });
        setShowActionMedicationModal(true);
    }

    const handelCloseMedication = () => {
        setShowActionMedicationModal(false);
        setSelectedMedication(null);
    }

    const handelditActionCTScans = (item) => {
        setSelectedCTscan({
            id: item.id,
            scanner_id: item.scanner_id
        })
        setShowActionCTScanModal(true)
    }

    const handelCloseCTScans = () => {
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
                        <div className="flex flex-col gap-3 px-4 text-lg">
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
                                                    onClick={() => handelEditMedicationClick(item)}
                                                    className="hover:text-blue-700"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button
                                onClick={() => handelInserMedication()}
                                className="bg-green-600 rounded-xl px-6 py-2 dark:text-gray-950 text-xl w-fit"
                            ><i class="fa-solid fa-plus"></i></button>
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
                                                    onClick={() => handelditActionCTScans(item)}
                                                    className="hover:text-blue-700"
                                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button
                                onClick={() => handelInserCTScans()}
                                className="bg-green-600 rounded-xl px-6 py-2 dark:text-gray-950 text-xl w-fit"
                            ><i class="fa-solid fa-plus"></i></button>
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
                                                    onClick={() => handelEditLabResult(item)}
                                                    className="hover:text-blue-700"
                                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button
                                onClick={() => handelInserLabResult()}
                                className="bg-green-600 rounded-xl px-6 py-2 dark:text-gray-950 text-xl w-fit"
                            ><i class="fa-solid fa-plus"></i></button>
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
                                                    onClick={() => handelEditResult(item)}
                                                    className="hover:text-blue-700"
                                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button
                                onClick={() => handelInserCheckup()}
                                className="bg-green-600 rounded-xl px-6 py-2 dark:text-gray-950 text-xl w-fit"
                            ><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </section>
                <section className="dark:bg-gray-800 dark:text-gray-100 px-12 py-8 rounded-lg flex flex-col items-start gap-4">
                    <h1 className="text-3xl font-extrabold">Note</h1>
                    <div className="text-xl">
                        {note.length > 0 ? (
                            note.map((item, index) => (
                                <div key={index} className="flex flex-col justify-between items-center gap-4">
                                    <div style={{ whiteSpace: "pre-wrap" }}>
                                        {item.note}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handelEditNote(item)}
                                        className="bg-green-600 dark:text-gray-900 hover:text-blue-700 py-2 px-7 w-fit rounded-lg"
                                        aria-label="Edit note"
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No notes available.</p>
                        )}
                    </div>
                </section>
            </section>
            {/* Inser Modals */}
            {
                showInsertMedication && (
                    <InsertMedication
                        data={medications}
                        actionId={resultId}
                        onClose={handelCloseInsertMedication}
                    />
                )
            }
            {
                showInsertLabResult && (
                    <InsertLabResult
                        actionId={resultId}
                        data={lab_results}
                        onClose={handelCloseInserLabResult}
                    />
                )
            }
            {
                showInsertCTScans && (
                    <InsertScanner
                        actionId={resultId}
                        data={scanners}
                        onClose={handelCloseInserCTScans}
                    />
                )
            }
            {
                showInsertCheckup && (
                    <InsertCheckUpResult
                        actionId={resultId}
                        data={check_ups}
                        onClose={handelCloseInsertCheckup}
                    />
                )
            }

            {/* UpdateModals */}
            {
                showNoteModal && selectedNote && (
                    <NoteUpdate
                        data={[selectedNote]}
                        onClose={handelCloseNote}
                    />
                )
            }

            {
                showActionMedicationModal && selectedMedication && (
                    <UpdateDeleteMedication
                        data={selectedMedication}
                        medication={medications}
                        onClose={handelCloseMedication}
                    />
                )
            }
            {
                showActionCTScanModal && selectCTScan && (
                    <UpdateDeleteCTScans
                        data={selectCTScan}
                        CTScans={scanners}
                        onClose={handelCloseCTScans}
                    />
                )
            }

            {
                showLabResultModal && selectedLabResult && (
                    <UpdateLabResults
                        data={selectedLabResult}
                        labResults={lab_results}
                        onClose={handelCloseLabResult}
                    />
                )
            }

            {
                showResultModal && selectedResult && (
                    <UpdateRuslt
                        data={selectedResult}
                        check_up={check_ups}
                        onClose={handelCloseResult}
                    />
                )
            }

        </ResultsLayout >
    )
}