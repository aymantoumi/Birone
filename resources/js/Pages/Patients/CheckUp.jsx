import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useEffect } from "react";

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

export default function EditCheckUp({ auth, check_up, pending_actions, scanners, lab_results, medications, check_ups }) {
    const { data, setData, errors, put, processing } = useForm({
        action_id: '',
        scans: [],
        labResults: [],
        medications: [],
        check_up: [],
        note: ''
    });

    useEffect(() => {
        // Initialize form with existing data
        setData({
            action_id: check_up.action_id,
            scans: check_up.scans?.map(s => s.id.toString()) || [],
            labResults: check_up.lab_results?.map(l => l.id.toString()) || [],
            medications: check_up.medications?.map(m => m.id.toString()) || [],
            check_up: check_up.check_ups?.map(c => c.id.toString()) || [],
            note: check_up.note?.note || ''
        });
    }, [check_up]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('check_up.update', check_up.id), {
            preserveScroll: true,
            onSuccess: () => router.visit(route('Patients.create')),
        });
    };

    return (
        <PatientsLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Check-up
                </h2>
            }
        >
            <Head title="Edit Check-up" />
            <section className="py-8 px-24 grid gap-3">
                <form onSubmit={handleSubmit}>
                    <div className="dark:bg-gray-800 bg-sky-100 py-8 px-24 rounded-lg flex flex-col gap-4">
                        <div className="dark:bg-gray-900 bg-zinc-300 rounded-lg py-4 px-10">
                            <select
                                className="rounded-xl w-[16rem]"
                                value={data.action_id}
                                onChange={(e) => setData('action_id', e.target.value)}
                                disabled={processing}
                            >
                                <option value="" disabled hidden>Select an action</option>
                                {pending_actions.map((action) => {
                                    const formattedDate = new Date(action.created_at).toISOString().split("T")[0];
                                    const actionType = action.action_type?.action || "No action type";
                                    return (
                                        <option value={action.id} key={action.id}>
                                            {formattedDate} | {actionType}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.action_id && <span className="text-red-500">{errors.action_id}</span>}
                        </div>

                        <div className='grid gap-6'>
                            <div className="dark:bg-gray-900 bg-zinc-300 py-8 px-24 rounded-lg flex flex-wrap gap-4 justify-between">
                                <DynamicSelectGroup
                                    title="CT Scans"
                                    options={scanners.map(scanner => ({ id: scanner.id, label: scanner.scan }))}
                                    values={data.scans}
                                    onChange={(index, value) => {
                                        const updatedScans = [...data.scans];
                                        updatedScans[index] = value;
                                        setData('scans', updatedScans);
                                    }}
                                    onAdd={() => setData('scans', [...data.scans, ""])}
                                    namePrefix="scans"
                                />

                                <DynamicSelectGroup
                                    title="Lab Results"
                                    options={lab_results.map(labResult => ({ id: labResult.id, label: labResult.lab_results }))}
                                    values={data.labResults}
                                    onChange={(index, value) => {
                                        const updatedLabResults = [...data.labResults];
                                        updatedLabResults[index] = value;
                                        setData('labResults', updatedLabResults);
                                    }}
                                    onAdd={() => setData('labResults', [...data.labResults, ""])}
                                    namePrefix="labResults"
                                />

                                <DynamicSelectGroup
                                    title="Medication"
                                    options={medications.map(medication => ({ id: medication.id, label: medication.medication }))}
                                    values={data.medications}
                                    onChange={(index, value) => {
                                        const updatedMedications = [...data.medications];
                                        updatedMedications[index] = value;
                                        setData('medications', updatedMedications);
                                    }}
                                    onAdd={() => setData('medications', [...data.medications, ""])}
                                    namePrefix="medications"
                                />

                                <DynamicSelectGroup
                                    title="Check-up"
                                    options={check_ups.map(check_up => ({ id: check_up.id, label: check_up.check_up }))}
                                    values={data.check_up}
                                    onChange={(index, value) => {
                                        const updatedCheck_up = [...data.check_up];
                                        updatedCheck_up[index] = value;
                                        setData('check_up', updatedCheck_up);
                                    }}
                                    onAdd={() => setData('check_up', [...data.check_up, ""])}
                                    namePrefix="check_up"
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
                                        value={data.note}
                                        onChange={(e) => setData('note', e.target.value)}
                                        disabled={processing}
                                    ></textarea>
                                    {errors.note && <span className="text-red-500">{errors.note}</span>}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4 max-w-fit"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update Check-up"}
                        </button>
                    </div>
                </form>
            </section>
        </PatientsLayout>
    );
}