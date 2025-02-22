import { useState } from 'react';
import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, useForm } from "@inertiajs/react";
import Pagination from "../Components/Pagination";
import Update from './Update';
import Checkup from './Components/Checkup';

export default function Patient({ auth, patient, actions, actionsTypes, categories, medications, scanners, lab_results }) {
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
        medications: [],
        scanners: [],
        status: false,
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
                    action: '',
                    payment: '',
                    medications: [],
                    scanners: [],
                    status: false,
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

    const lastAction = actions.data[actions.data.length - 1].id
    

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
                    {/* Actions form  */}
                    <div className="flex flex-col gap-1 w-full bg-sky-600 dark:bg-gray-900 py-5 px-12 rounded-lg">
                        <form onSubmit={submitActionForm} method="POST" className="grid gap-2">
                            <input type="hidden" name="Patient_ID" value={patient.id} />
                            <div className="flex justify-between gap-2 items-center">
                                <label htmlFor="action" className="dark:text-stone-200 font-extrabold">Action </label>
                                <select
                                    name="action"
                                    id="action"
                                    className="font-bold rounded-xl w-1/2"
                                    value={actionData.action}
                                    onChange={handleActionChange('action')}
                                >
                                    <option value="" disabled>Select visit type</option>
                                    {actionsTypes.map((type, index) => (
                                        <option key={index} value={type.id}>{type.action}</option>
                                    ))}
                                </select>
                                {actionErrors.action && <span className="text-red-500">{actionErrors.action}</span>}
                            </div>
                            <div className="flex justify-between gap-2 items-center">
                                <label htmlFor="price" className="dark:text-stone-200 font-extrabold">Price</label>
                                <input
                                    type="number"
                                    name="payment"
                                    id="price"
                                    className="font-bold rounded-xl w-1/2"
                                    value={actionData.payment}
                                    onChange={handleActionChange('payment')}
                                />
                                {actionErrors.payment && <span className="text-red-500">{actionErrors.payment}</span>}
                            </div>
                            <div className="flex justify-evenly">
                                <button type="reset" className="bg-yellow-300 ax-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-yellow-400 hover:scale-110 transition-all ">
                                    Cancel
                                </button>
                                <button type="submit" className="dark:bg-emerald-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-emerald-400  transition-all" disabled={actionProcessing}>
                                    Add
                                </button>
                            </div>
                        </form>
                        {/* Display actions */}
                        {actions.data.map((action, index) => {
                            const formattedDate = new Date(action.created_at).toISOString().split('T')[0];
                            const actionType = action.action_type?.action || "No action type"; // Fallback to handle missing data

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
                {auth.user.role === 'admin' && (
                    <div className="dark:bg-gray-800 bg-sky-100 py-8 px-24 rounded-lg grid ">
                        <Checkup 
                            labResults={lab_results}
                            medications={medications}
                            scanners={scanners}
                            lastAction={lastAction}
                        />
                    </div>
                )}
            </section>

            {/* Update Modal */}
            {selectedAction && (
                <Update action={selectedAction} actionsTypes={actionsTypes} onClose={closeModal} />
            )}
        </PatientsLayout>
    );
}
