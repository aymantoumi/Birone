import { useForm } from "@inertiajs/react";

export default function MedicationClasses() {
    const { data, setData, post, processing, errors, reset } = useForm({
        medication_class: '',
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('medicationClass.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <form
            onSubmit={submitForm}
            className="flex flex-col flex-1 gap-4 min-w-[8em] min-h-[6em] px-8 py-4 bg-sky-700 rounded-xl"
        >
            <label htmlFor="medication_class">Medication Class</label>
            <input
                type="text"
                name="medication_class"
                id="medication_class"
                className="max-w-96 rounded-lg"
                value={data.medication_class}
                onChange={(e) => setData('medication_class', e.target.value)}
            />
            {errors.medication_class && (
                <span className="text-red-500">{errors.medication_class}</span>
            )}
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