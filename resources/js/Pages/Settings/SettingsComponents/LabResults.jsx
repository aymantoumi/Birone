import { useForm } from "@inertiajs/react"

export default function LabResults() {

    const { data, setData, post, processing, errors, reset } = useForm({
        lab_results: ''
    })

    function submitForm(e) {

        e.preventDefault();
        post(route('lab_results.store'), {
            onSuccess: () => reset(),
        });
    }
    return (
        <form
            onSubmit={submitForm}
            method="post"
            className="flex flex-col flex-1 gap-4 min-w-[8em] min-h-[6em] px-8 py-4 bg-sky-700 rounded-xl"

        >
            <label htmlFor="lab_results">Lab Results</label>
            <input
                type="text"
                name="lab_results"
                id="lab_results"
                className="max-w-96 rounded-lg"
                value={data.lab_results}
                onChange={(e) => setData('lab_results', e.target.value)}
            />
            {
                errors.lab_results && (
                    <span className="text-red-500"> {errors.lab_results} </span>
                )
            }
            <button
                type="submit"
                className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-emerald-500 transition-all"
                disabled={processing}
            >
                {processing ? 'Adding ...' : 'Add'}
            </button>
        </form>
    )
}