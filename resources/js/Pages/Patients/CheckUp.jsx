import React from "react";
import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, useForm } from "@inertiajs/react";

export default function EditCheckUp({
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
    const {
        data: checkUpData,
        setData: setCheckUpData,
        post: postCheckUpData,
        processing: checkUpProcessing,
        error: checkError,
    } = useForm({
        action_id: "",
        // CT Scans
        deleteScans: [],
        updateScans: [],
        insertScans: [],
        // Lab Results
        deleteLabResults: [],
        updateLabResults: [],
        insertLabResults: [],
        // Medications
        deleteMedication: [],
        updateMedication: [],
        insertMedication: [],
        // Check-ups
        deleteCheckUps: [],
        updateCheckUps: [],
        insertCheckUps: [],
        Notes: "",
    });

    // Handle adding an item to the delete array
    const handleDeleteItem = (type, id) => {
        if (type === "medication") {
            setCheckUpData("deleteMedication", [...checkUpData.deleteMedication, id]);
        } else if (type === "checkup") {
            setCheckUpData("deleteCheckUps", [...checkUpData.deleteCheckUps, id]);
        } else if (type === "scanner") {
            setCheckUpData("deleteScans", [...checkUpData.deleteScans, id]);
        } else if (type === "labResult") {
            setCheckUpData("deleteLabResults", [...checkUpData.deleteLabResults, id]);
        }
    };

    // Handle updating an existing item
    const handleUpdateItem = (type, index, value) => {
        if (type === "medication") {
            const updatedMedications = [...checkUpData.updateMedication];
            updatedMedications[index] = { action_id: action_medication[index].action_id, medication_id: value };
            setCheckUpData("updateMedication", updatedMedications);
        } else if (type === "checkup") {
            const updatedCheckUps = [...checkUpData.updateCheckUps];
            updatedCheckUps[index] = { action_id: action_chesk_ups[index].action_id, check_up_id: value };
            setCheckUpData("updateCheckUps", updatedCheckUps);
        } else if (type === "scanner") {
            const updatedScans = [...checkUpData.updateScans];
            updatedScans[index] = { action_id: action_scanners[index].action_id, scanner_id: value };
            setCheckUpData("updateScans", updatedScans);
        } else if (type === "labResult") {
            const updatedLabResults = [...checkUpData.updateLabResults];
            updatedLabResults[index] = { action_id: action_lab_results[index].action_id, lab_result_id: value };
            setCheckUpData("updateLabResults", updatedLabResults);
        }
    };

    return (
        <PatientsLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {patient.patient.first_name} {patient.patient.last_name}
                </h2>
            }
        >
            <section className="flex flex-col px-20 py-10">
                <form method="post" className="flex flex-col gap-5">
                    <div className="dark:bg-gray-800 bg-sky-100 py-8 px-24 rounded-lg flex justify-evenly flex-wrap gap-4">
                        {/* Medications Section */}
                        <Section
                            title="Medications"
                            options={(medications || []).map((med) => ({ id: med.id, label: med.medication }))}
                            existingItems={action_medication.map((item) => ({
                                id: item.action_id,
                                value: item.medication.id,
                                label: item.medication.medication,
                            }))}
                            values={checkUpData.insertMedication}
                            onChange={(index, value) => {
                                const updatedValues = [...checkUpData.insertMedication];
                                updatedValues[index] = value;
                                setCheckUpData("insertMedication", updatedValues);
                            }}
                            onAdd={() => setCheckUpData("insertMedication", [...checkUpData.insertMedication, ""])}
                            onDelete={(id) => handleDeleteItem("medication", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="medication"
                            namePrefix="medication"
                        />

                        {/* Check-ups Section */}
                        <Section
                            title="Check-ups"
                            options={(check_ups || []).map((check_up) => ({ id: check_up.id, label: check_up.check_up }))}
                            existingItems={action_chesk_ups.map((item) => ({
                                id: item.action_id,
                                value: item.check_up.id,
                                label: item.check_up.check_up,
                            }))}
                            values={checkUpData.insertCheckUps}
                            onChange={(index, value) => {
                                const updatedValues = [...checkUpData.insertCheckUps];
                                updatedValues[index] = value;
                                setCheckUpData("insertCheckUps", updatedValues);
                            }}
                            onAdd={() => setCheckUpData("insertCheckUps", [...checkUpData.insertCheckUps, ""])}
                            onDelete={(id) => handleDeleteItem("checkup", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="checkup"
                            namePrefix="check-up"
                        />

                        {/* CT Scans Section */}
                        <Section
                            title="CT Scans"
                            options={(scanners || []).map((scan) => ({ id: scan.id, label: scan.scan }))}
                            existingItems={action_scanners.map((item) => ({
                                id: item.action_id,
                                value: item.scanner.id,
                                label: item.scanner.scan,
                            }))}
                            values={checkUpData.insertScans}
                            onChange={(index, value) => {
                                const updatedValues = [...checkUpData.insertScans];
                                updatedValues[index] = value;
                                setCheckUpData("insertScans", updatedValues);
                            }}
                            onAdd={() => setCheckUpData("insertScans", [...checkUpData.insertScans, ""])}
                            onDelete={(id) => handleDeleteItem("scanner", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="scanner"
                            namePrefix="scanner"
                        />

                        {/* Laboratory Results Section */}
                        <Section
                            title="Lab Results"
                            options={(lab_results || []).map((lab) => ({ id: lab.id, label: lab.lab_results }))}
                            existingItems={action_lab_results.map((item) => ({
                                id: item.action_id,
                                value: item.lab_result.id,
                                label: item.lab_result.lab_results,
                            }))}
                            values={checkUpData.insertLabResults}
                            onChange={(index, value) => {
                                const updatedValues = [...checkUpData.insertLabResults];
                                updatedValues[index] = value;
                                setCheckUpData("insertLabResults", updatedValues);
                            }}
                            onAdd={() => setCheckUpData("insertLabResults", [...checkUpData.insertLabResults, ""])}
                            onDelete={(id) => handleDeleteItem("labResult", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="labResult"
                            namePrefix="lab-result"
                        />
                    </div>

                    {/* Note Section */}
                    <div className="dark:bg-gray-800 bg-zinc-300 py-8 px-24 rounded-lg flex flex-wrap gap-4">
                        <div className="flex flex-col gap-2 flex-basis-[calc(100%-0.5rem)] min-w-[40rem]">
                            <label htmlFor="note" className="dark:text-gray-100 text-2xl font-bold">Note</label>
                            {note.map((item, index) => (
                                <textarea
                                    value={item.note}
                                    name="note"
                                    id="note"
                                    rows="15"
                                    className="rounded-xl"
                                    key={index}
                                    onChange={(e) => {
                                        const updatedNotes = [...note];
                                        updatedNotes[index].note = e.target.value;
                                        setCheckUpData("Notes", updatedNotes);
                                    }}
                                ></textarea>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4 max-w-fit"
                    >
                        Save
                    </button>
                </form>
            </section>
            <Head title="Edit Check-up" />
        </PatientsLayout>
    );
}

// Reusable Section Component
const Section = ({
    title,
    options,
    existingItems,
    values,
    onChange,
    onAdd,
    onDelete,
    onUpdate,
    type,
    namePrefix,
}) => {
    return (
        <div className="flex flex-col gap-4 ">
            <h1 className="text-xl font-extrabold dark:text-gray-200">{title}</h1>

            {/* Existing Items */}
            <ul className="list-disc">
                {existingItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <select
                            className="rounded-xl w-[16rem]"
                            value={item.value}
                            onChange={(e) => onUpdate(type, index, e.target.value)}
                        >
                            <option value="">Select an option</option>
                            {options.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <button
                            className="text-red-500 w-fit"
                            onClick={() => onDelete(item.id)}
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </li>
                ))}
            </ul>

            {/* Add New Items */}
            <DynamicSelectGroup
                title={`Add ${title}`}
                options={options}
                values={values}
                onChange={onChange}
                onAdd={onAdd}
                namePrefix={namePrefix}
            />
        </div>
    );
};

// Dynamic Select Group Component
const DynamicSelectGroup = ({ title, options, values, onChange, onAdd, namePrefix }) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="dark:text-gray-200 text-xl font-extrabold">{title}</h1>
            <div className="flex flex-col flex-wrap gap-3">
                {values.map((value, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <select
                            className="rounded-xl w-[16rem]"
                            name={`${namePrefix}-${index}`}
                            id={`${namePrefix}-${index}`}
                            value={value || ""}
                            onChange={(e) => onChange(index, e.target.value)}
                        >
                            <option value="">Select an option</option>
                            {options.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={onAdd}
                    className="text-green-600 text-2xl w-fit"
                >
                    <i className="fa-solid fa-circle-plus"></i>
                </button>
            </div>
        </div>
    );
};