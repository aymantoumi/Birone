import React from "react";
import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

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
    note: initialNote,
}) {
    const {
        data: checkUpData,
        setData: setCheckUpData,
        put: putCheckUpData,
        processing: checkUpProcessing,
        errors: checkErrors,
    } = useForm({
        _method: "PUT",
        action_id: patient.id || "",
        deleteScans: [],
        updateScans: action_scanners.map((item) => ({ scan_id: item.scanner.id })),
        insertScans: [],
        deleteLabResults: [],
        updateLabResults: action_lab_results.map((item) => ({ lab_result_id: item.lab_result.id })),
        insertLabResults: [],
        deleteMedication: [],
        updateMedication: action_medication.map((item) => ({ medication_id: item.medication.id })),
        insertMedication: [],
        deleteCheckUps: [],
        updateCheckUps: action_chesk_ups.map((item) => ({ check_up_id: item.check_up.id })),
        insertCheckUps: [],
        Notes: initialNote?.map((item) => item.note).join("\n") || "",
    });

    const handleDeleteItem = (type, id) => {
        const typeToKey = {
            medication: "deleteMedication",
            checkup: "deleteCheckUps",
            scanner: "deleteScans",
            labResult: "deleteLabResults",
        };
        const deleteKey = typeToKey[type];
        if (deleteKey) {
            setCheckUpData(deleteKey, [...checkUpData[deleteKey], id]);
        } else {
            console.error(`Unknown type: ${type}`);
        }
    };

    const handleUpdateItem = (type, index, value) => {
        const typeToUpdateKey = {
            medication: "updateMedication",
            checkup: "updateCheckUps",
            scanner: "updateScans",
            labResult: "updateLabResults",
        };
        const updateKey = typeToUpdateKey[type];
        if (updateKey) {
            const updatedArray = [...checkUpData[updateKey]];
            updatedArray[index] = { ...updatedArray[index], [`${type}_id`]: value };
            setCheckUpData(updateKey, updatedArray);
        } else {
            console.error(`Unknown type: ${type}`);
        }
    };

    const handleAddItem = (type) => {
        const typeToKey = {
            medication: "insertMedication",
            checkup: "insertCheckUps",
            scanner: "insertScans",
            labResult: "insertLabResults",
        };
        const insertKey = typeToKey[type];
        if (insertKey) {
            setCheckUpData(insertKey, [...checkUpData[insertKey], ""]);
        } else {
            console.error(`Unknown type: ${type}`);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        const formElement = e.target; // Get the form element from the event

        putCheckUpData(route("results.update", { result: checkUpData.action_id }), {
            _method: "put",
            onSuccess: () => {
                // Show a small toast notification for success
                toast.success("Check-up updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                // Reset the form fields
                formElement.reset();
            },
            onError: (errors) => {
                console.error("Form submission errors:", errors);

                // Show an error toast notification
                toast.error("An error occurred while saving the check-up.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            },
        });
    };
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
            <section className="flex flex-col px-20 py-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="hidden"
                        name="action_id"
                        value={checkUpData.action_id}
                        readOnly
                    />
                    <input
                        type="hidden"
                        name="patient_id"
                        value={checkUpData.patient_id}
                        readOnly
                    />
                    {/* Main Content */}
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
                            onAdd={() => handleAddItem("medication")}
                            onDelete={(id) => handleDeleteItem("medication", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="medication"
                            namePrefix="medication"
                            checkUpData={checkUpData}
                        />
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
                            onAdd={() => handleAddItem("checkup")}
                            onDelete={(id) => handleDeleteItem("checkup", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="checkup"
                            namePrefix="check-up"
                            checkUpData={checkUpData}
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
                            onAdd={() => handleAddItem("scanner")}
                            onDelete={(id) => handleDeleteItem("scanner", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="scanner"
                            namePrefix="scanner"
                            checkUpData={checkUpData}
                        />
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
                            onAdd={() => handleAddItem("labResult")}
                            onDelete={(id) => handleDeleteItem("labResult", id)}
                            onUpdate={(type, index, value) => handleUpdateItem(type, index, value)}
                            type="labResult"
                            namePrefix="lab-result"
                            checkUpData={checkUpData}
                            setCheckUpData={setCheckUpData}
                        />
                    </div>
                    {/* Note Section */}
                    <div className="dark:bg-gray-800 bg-zinc-300 py-8 px-24 rounded-lg flex flex-wrap gap-4">
                        <div className="flex flex-col gap-2 flex-basis-[calc(100%-0.5rem)] min-w-[40rem]">
                            <label htmlFor="note" className="dark:text-gray-100 text-2xl font-bold">
                                Note
                            </label>
                            {/* Ensure note is initialized properly if empty or undefined */}
                            {
                                (checkUpData.Notes ? checkUpData.Notes.split("\n").map((note, index) => ({ note })) : [{ note: "" }])
                                    .map((item, index) => (
                                        <textarea
                                            key={index}
                                            value={item.note || ""}
                                            name="note"
                                            id={`note-${index}`}
                                            rows="15"
                                            className="rounded-xl"
                                            onChange={(e) => {
                                                const updatedNotes = (checkUpData.Notes ? checkUpData.Notes.split("\n") : [""]).map(
                                                    (note, idx) => (idx === index ? e.target.value : note)
                                                );
                                                setCheckUpData("Notes", updatedNotes.join("\n")); // Update checkUpData.Notes
                                            }}
                                        />
                                    ))
                            }
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
    checkUpData,
    setCheckUpData,
}) => {
    return (
        <div className="flex flex-col gap-4">
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
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                className="rounded"
                                checked={checkUpData[`delete${type.charAt(0).toUpperCase() + type.slice(1)}s`]?.includes(item.id)}
                                onChange={(e) => {
                                    const deleteKey = `delete${type.charAt(0).toUpperCase() + type.slice(1)}s`;
                                    const currentDeletionList = checkUpData[deleteKey] || [];
                                    if (e.target.checked) {
                                        // Add the item ID to the deletion list
                                        setCheckUpData(deleteKey, [...currentDeletionList, item.id]);
                                    } else {
                                        // Remove the item ID from the deletion list
                                        setCheckUpData(
                                            deleteKey,
                                            currentDeletionList.filter((id) => id !== item.id)
                                        );
                                    }
                                }}
                            />
                            <span className="text-red-500">
                                <i className="fa-solid fa-trash-can"></i>
                            </span>
                        </label>
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