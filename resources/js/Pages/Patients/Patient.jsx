import { useState } from "react";
import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, useForm } from "@inertiajs/react";
import Pagination from "../Components/Pagination";
import Update from './Update';

export default function Patient({ auth, patient, actions, actionsTypes, categories, scanners, medications, lab_results }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: patient.first_name || "",
        last_name: patient.last_name || "",
        birth_date: patient.birth_date || "",
        cin: patient.cin || "",
        gender: patient.gender || "",
        phone: patient.phone || "",
        category_id: patient.category_id || "",
        _method: "PUT",
    });

    const { data: actionData, setData: setActionData, post: postAction, processing: actionProcessing, errors: actionErrors } = useForm({
        action: '',
        payment: '',
    });

    // Use useForm for the Check-Up form
    const { data: checkUpData, setData: setCheckUpData, post: postCheckUp, processing: checkUpProcessing, errors: checkUpErrors } = useForm({
        action_id: '',
        scans: [],
        labResults: [],
        medications: [],
        note: '',
        check_up: '',
    });

    const [selectedAction, setSelectedAction] = useState(null);

    const handleChange = (field) => (e) => {
        setData(field, e.target.value);
    };

    const handleActionChange = (field) => (event) => {
        setActionData({
            ...actionData,
            [field]: event.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        put(route("Patients.update", patient.id));
    };

    const submitActionForm = async (e) => {
        e.preventDefault();
        postAction(route('patients.actions.store', { patient: patient.id }), {
            onSuccess: () => {
                setActionData({
                    Action: '',
                    Payment: '',
                });
            },
        });
    };

    const handleActionClick = (action) => {
        setSelectedAction(action);
    };

    const closeModal = () => {
        setSelectedAction(null);
    };

    // Handle changes in dynamic select groups
    const handleChangeDynamic = (namePrefix, index, value) => {
        if (namePrefix === "scans") {
            const updatedScans = [...checkUpData.scans];
            updatedScans[index] = value;
            setCheckUpData('scans', updatedScans);
        } else if (namePrefix === "labResults") {
            const updatedLabResults = [...checkUpData.labResults];
            updatedLabResults[index] = value;
            setCheckUpData('labResults', updatedLabResults);
        } else if (namePrefix === "medications") {
            const updatedMedications = [...checkUpData.medications];
            updatedMedications[index] = value;
            setCheckUpData('medications', updatedMedications);
        }
    };

    // Add new field to dynamic select groups
    const addNew = (namePrefix) => {
        if (namePrefix === "scans") {
            setCheckUpData('scans', [...checkUpData.scans, ""]);
        } else if (namePrefix === "labResults") {
            setCheckUpData('labResults', [...checkUpData.labResults, ""]);
        } else if (namePrefix === "medications") {
            setCheckUpData('medications', [...checkUpData.medications, ""]);
        }
    };

    // Handle Check-Up Form Submission
    const handleSubmitCheckUp = (e) => {
        e.preventDefault();

        // Submit the form data using Inertia's post method
        postCheckUp(route('patients.checkup', { patient: patient.id }), {
            onSuccess: () => {
                console.log("Check-up data saved successfully!");
            },
            onError: (errors) => {
                console.error("Validation errors:", errors);
            },
        });
    };

    return (
        <PatientsLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Patient "{patient.first_name} {patient.last_name}"
                </h2>
            }
        >
            <Head title="Patient file" />
            <section className="py-8 px-24 grid gap-3">
                {/* Patient Details Form */}
                <div className="dark:bg-gray-800 py-8 px-24 rounded-lg grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
                    <form
                        className="2xl:col-span-2 bg-sky-600 dark:bg-gray-900 py-5 px-12 rounded-lg"
                        onSubmit={submitForm}
                        method="POST"
                    >
                        <div className="flex flex-col gap-5">
                            {["first_name", "last_name", "cin", "phone"].map((field) => (
                                <div key={field} className="flex justify-between items-center gap-2 min-w-fit">
                                    <h1 className="font-extrabold dark:text-stone-500 text-lg">{field.replace("_", " ")}:</h1>
                                    <input
                                        type="text"
                                        className="font-bold rounded-xl"
                                        value={data[field]}
                                        onChange={handleChange(field)}
                                    />
                                    {errors[field] && <span className="text-red-500">{errors[field]}</span>}
                                </div>
                            ))}
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">Category:</h1>
                                <select
                                    className="font-bold rounded-xl"
                                    value={data.category_id || ""}
                                    onChange={(e) => setData("category_id", e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <span className="text-red-500">{errors.category_id}</span>}
                            </div>
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">Birthdate:</h1>
                                <input
                                    type="date"
                                    className="font-bold rounded-xl"
                                    value={data.birth_date ? new Date(data.birth_date).toISOString().slice(0, 10) : ""}
                                    onChange={handleChange("birth_date")}
                                />
                                {errors.birth_date && <span className="text-red-500">{errors.birth_date}</span>}
                            </div>
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">Gender:</h1>
                                <select
                                    className="font-bold rounded-xl"
                                    value={data.gender || ""}
                                    onChange={(e) => setData("gender", e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update"}
                        </button>
                    </form>

                    {/* Actions Form */}
                    <div className="flex flex-col gap-1 w-full bg-sky-600 dark:bg-gray-900 py-5 px-12 rounded-lg">
                    <form onSubmit={submitActionForm} method="POST" className="grid gap-2">
                            <input type="hidden" name="Patient_ID" value={patient.id} />
                            <div className="flex justify-between gap-2 items-center">
                                <label htmlFor="action" className="dark:text-stone-200 font-extrabold">Action </label>
                                <select
                                    name="Action"
                                    id="action"
                                    className="font-bold rounded-xl w-1/2"
                                    value={actionData.Action}
                                    onChange={handleActionChange('Action')}
                                >
                                    <option value="" disabled selected>Select visit type</option>
                                    {actionsTypes.map((type, index) => (
                                        <option key={index} value={type.id}>{type.action}</option>
                                    ))}
                                </select>
                                {actionErrors.Action && <span className="text-red-500">{actionErrors.Action}</span>}
                            </div>
                            <div className="flex justify-between gap-2 items-center">
                                <label htmlFor="price" className="dark:text-stone-200 font-extrabold">Price</label>
                                <input
                                    type="number"
                                    name="Payment"
                                    id="price"
                                    className="font-bold rounded-xl w-1/2"
                                    value={actionData.Payment}
                                    onChange={handleActionChange('Payment')}
                                />
                                {actionErrors.Payment && <span className="text-red-500">{actionErrors.Payment}</span>}
                            </div>
                            <div className="flex justify-evenly">
                                <button type="reset" className="bg-yellow-300 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-yellow-400 hover:scale-110 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="dark:bg-emerald-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-emerald-400 transition-all" disabled={processing}>
                                    Add
                                </button>
                            </div>
                        </form>
                         {/* Display actions */}
                         {actions.data.map((action, index) => {
                            const formattedDate = new Date(action.created_at).toISOString().split('T')[0];
                            const actionType = action.action_type?.action || "No action type";
                            return (
                                <div key={index} className="flex justify-between min-w-fit bg-emerald-200 py-2 px-4 rounded-md" onClick={() => handleActionClick(action)}>
                                    <span>{action.id}</span>
                                    <span className="font-extrabold"> {actionType} </span>
                                    <span> {formattedDate} </span>
                                </div>
                            );
                        })}
                        <Pagination links={actions.links} />
                    </div>
                </div>

                {/* Check-Up Form */}
                {auth.user.role === 'admin' && (
                    <form onSubmit={handleSubmitCheckUp} method="post">
                        <div className="dark:bg-gray-800 bg-sky-100 py-8 px-24 rounded-lg flex flex-col gap-4">
                            <div className="dark:bg-gray-900 bg-zinc-300 rounded-lg py-4 px-10">
                                <select
                                    className="rounded-xl w-[16rem]"
                                    name="action_id"
                                    value={checkUpData.action_id}
                                    onChange={(e) => setCheckUpData('action_id', e.target.value)}
                                >
                                    <option value="" disabled selected hidden>
                                        Select an action
                                    </option>
                                    {actions.data.map((action, index) => {
                                        const formattedDate = new Date(action.created_at).toISOString().split("T")[0];
                                        const actionType = action.action_type?.action || "No action type";
                                        return (
                                            <option value={action.id} key={index}>
                                                {formattedDate} | {actionType}
                                            </option>
                                        );
                                    })}
                                </select>
                                {checkUpErrors.action_id && <span className="text-red-500">{checkUpErrors.action_id}</span>}
                            </div>
                            <div className='grid gap-6'>
                                <div className="dark:bg-gray-900 bg-zinc-300 py-8 px-24 rounded-lg flex flex-wrap gap-4 justify-between">
                                    <DynamicSelectGroup
                                        title="CT Scans"
                                        options={scanners.map(scanner => ({ id: scanner.id, label: scanner.scan }))}
                                        values={checkUpData.scans}
                                        onChange={(index, value) => {
                                            const updatedScans = [...checkUpData.scans];
                                            updatedScans[index] = value;
                                            setCheckUpData('scans', updatedScans);
                                        }}
                                        onAdd={() => setCheckUpData('scans', [...checkUpData.scans, ""])}
                                        namePrefix="scans"
                                    />
                                    <DynamicSelectGroup
                                        title="Lab Results"
                                        options={lab_results.map(labResult => ({ id: labResult.id, label: labResult.lab_results }))}
                                        values={checkUpData.labResults}
                                        onChange={(index, value) => {
                                            const updatedLabResults = [...checkUpData.labResults];
                                            updatedLabResults[index] = value;
                                            setCheckUpData('labResults', updatedLabResults);
                                        }}
                                        onAdd={() => setCheckUpData('labResults', [...checkUpData.labResults, ""])}
                                        namePrefix="labResults"
                                    />
                                    <DynamicSelectGroup
                                        title="Medication"
                                        options={medications.map(medication => ({ id: medication.id, label: medication.medication }))}
                                        values={checkUpData.medications}
                                        onChange={(index, value) => {
                                            const updatedMedications = [...checkUpData.medications];
                                            updatedMedications[index] = value;
                                            setCheckUpData('medications', updatedMedications);
                                        }}
                                        onAdd={() => setCheckUpData('medications', [...checkUpData.medications, ""])}
                                        namePrefix="medications"
                                    />
                                </div>
                                <div className="dark:bg-gray-900 bg-zinc-300 py-8 px-24 rounded-lg flex flex-wrap gap-4 justify-between">
                                    <div className="flex flex-col gap-2 flex-basis-[calc(100%-0.5rem)] min-w-[40rem]">
                                        <label htmlFor="note" className="dark:text-gray-100 text-2xl font-bold">Note</label>
                                        <textarea
                                            name="note"
                                            id="note"
                                            rows="15"
                                            className="rounded-xl"
                                            value={checkUpData.note}
                                            onChange={(e) => setCheckUpData('note', e.target.value)}
                                        ></textarea>
                                        {checkUpErrors.note && <span className="text-red-500">{checkUpErrors.note}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2 flex-basis-[calc(100%-0.5rem)] min-w-[40rem]">
                                        <label htmlFor="check_up" className="dark:text-gray-100 text-2xl font-bold">Check up</label>
                                        <textarea
                                            name="check_up"
                                            id="check_up"
                                            rows="15"
                                            className="rounded-xl"
                                            value={checkUpData.check_up}
                                            onChange={(e) => setCheckUpData('check_up', e.target.value)}
                                        ></textarea>
                                        {checkUpErrors.check_up && <span className="text-red-500">{checkUpErrors.check_up}</span>}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4 max-w-fit"
                                disabled={checkUpProcessing}
                            >
                                {checkUpProcessing ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                )}
            </section>

            {/* Update Modal */}
            {selectedAction && (
                <Update action={selectedAction} actionsTypes={actionsTypes} onClose={closeModal} />
            )}
        </PatientsLayout>
    );
}

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
                    className="text-green-600 text-2xl"
                >
                    <i className="fa-solid fa-circle-plus"></i>
                </button>
            </div>
        </div>
    );
};