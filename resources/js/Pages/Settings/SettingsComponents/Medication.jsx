import { useForm } from "@inertiajs/react";

export default function Medication({ medicationClass }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        medication: '',
        medication_class_id: '', // Initialize as an empty string (no selection)
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('medications.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <form
            onSubmit={submitForm}
            method="post"
            className="flex flex-col flex-1 gap-4 min-w-[8em] min-h-[6em] px-8 py-4 bg-stone-400 rounded-xl"
        >
            {/* Medical Class Select */}
            <div className="flex flex-col gap-2">
                <label htmlFor="medication_class_id">Medical Class</label>
                <select
                    name="medication_class_id"
                    id="medication_class_id"
                    value={data.medication_class_id || ""} // Ensure empty string if null
                    onChange={(e) => setData('medication_class_id', e.target.value)}
                    className="max-w-96 rounded-lg"
                >
                    {/* Default Option */}
                    <option value="" disabled hidden>
                        Select a class
                    </option>

                    {/* Dynamic Options */}
                    {medicationClass.data.map((medicalClass) => (
                        <option key={medicalClass.id} value={medicalClass.id}>
                            {medicalClass.medication_class}
                        </option>
                    ))}
                </select>
            </div>

            {/* Medication Name Input */}
            <div className="flex flex-col gap-2">
                <label htmlFor="medication">Medication name:</label>
                <input
                    type="text"
                    name="medication"
                    id="medication"
                    className="max-w-96 rounded-lg"
                    value={data.medication}
                    onChange={(e) => setData('medication', e.target.value)}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-emerald-500 transition-all"
                disabled={processing}
            >
                {processing ? 'Adding ...' : 'Add'}
            </button>
        </form>
    );
}