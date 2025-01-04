import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Patient({ auth, patient }) {

    const { data, setData, put, processing, errors } = useForm({
        First_Name: patient.First_Name || '',
        Last_Name: patient.Last_Name || '',
        Birth_Date: new Date(patient.Birth_Date).toISOString().slice(0, 10), // Ensure date format is YYYY-MM-DD
        CIN: patient.CIN || '',
        Gender: patient.Gender || '',
    });

    function submitForm(e) {
        e.preventDefault();
    
        // Create a copy of the data object to modify
        const requestData = { ...data };
    
        
        if (requestData.CIN === patient.CIN) {
            delete requestData.CIN;
        }
    
        // Submit the updated data
        put(route("Patients.update", patient.id), { data: requestData });
    }
    

    return (
        <PatientsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"> Patient name</h2>}
        >
            <Head title="Patient file" />
            <section className="py-8 px-24 grid gap-3">
                <div className="dark:bg-gray-800 py-8 px-24 rounded-lg grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
                    <form
                        className="col-span-2 dark:bg-gray-900 py-5 px-12 rounded-lg"
                        onSubmit={submitForm}
                        method="POST"
                    >
                        <div className="flex flex-col gap-5">
                            {/* First Name */}
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                    First name:
                                </h1>
                                <input
                                    type="text"
                                    className="font-bold rounded-xl"
                                    value={data.First_Name}
                                    onChange={(e) => setData('First_Name', e.target.value)}
                                />
                            </div>
                                {errors.First_Name && <span className="text-red-500">{errors.First_Name}</span>}

                            {/* Last Name */}
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                    Last name:
                                </h1>
                                <input
                                    type="text"
                                    className="font-bold rounded-xl"
                                    value={data.Last_Name}
                                    onChange={(e) => setData('Last_Name', e.target.value)}
                                />
                            </div>
                                {errors.Last_Name && <span className="text-red-500">{errors.Last_Name}</span>}

                            {/* Birthdate */}
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                    Birthdate:
                                </h1>
                                <input
                                    type="date"
                                    className="font-bold rounded-xl"
                                    value={data.Birth_Date}
                                    onChange={(e) => setData('Birth_Date', e.target.value)}
                                />
                            </div>
                                {errors.Birth_Date && <span className="text-red-500">{errors.Birth_Date}</span>}

                            {/* CIN */}
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                    CIN:
                                </h1>
                                <input
                                    type="text"
                                    className="font-bold rounded-xl"
                                    value={data.CIN}
                                    onChange={(e) => setData('CIN', e.target.value)}
                                />
                            </div>
                                {errors.CIN && <span className="text-red-500">{errors.CIN}</span>}

                            {/* Gender */}
                            <div className="flex justify-between items-center gap-2 min-w-fit">
                                <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                    Gender:
                                </h1>
                                <select
                                    className="font-bold rounded-xl"
                                    value={data.Gender}
                                    onChange={(e) => setData('Gender', e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                                {errors.Gender && <span className="text-red-500">{errors.Gender}</span>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4"
                            disabled={processing}
                        >
                            {processing ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                    <div className="flex flex-col gap-1 w-full dark:bg-gray-900 py-5 px-12 rounded-lg">
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                    </div>
                </div>
                <div className="dark:bg-gray-800 py-8 px-24 rounded-lg grid  lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="dark:bg-gray-900 rounded-lg py-4 px-10">
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Past Medical Conditions :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Past Surgeries :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Family Medical History  :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Smoking Status :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Alcohol Consumption :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                    </div>
                    <div className="dark:bg-gray-900 py-8 px-24 rounded-lg grid  lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="flex items-center flex-wrap gap-2 min-w-fit ">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Allergies  :
                            </h1>
                            <ul className="flex flex-col gap-4">
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                            </ul>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Chronic Diseases :
                            </h1>
                            <ul className="flex flex-col gap-4">
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </PatientsLayout>
    )
};