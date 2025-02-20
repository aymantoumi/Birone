import { useForm } from "@inertiajs/react";

export default function Scans() {
    const { data, setData, post, processing, errors, reset } = useForm({
        scan: '' 
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('scans.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <form
            onSubmit={submitForm}
            method="post"
            className="flex flex-col flex-1 gap-4 min-w-[8em] min-h-[6em] px-8 py-4 bg-stone-400 rounded-xl"
        >
            <label htmlFor="scan">Scan name </label> 
            <input
                type="text"
                name="scan" 
                id="scan" 
                className="max-w-96 rounded-lg"
                value={data.scan} 
                onChange={(e) => setData('scan', e.target.value)} 
            />
            {
                errors.scan && (
                    <span className="text-red-500"> {errors.scan} </span>
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
    );
}
