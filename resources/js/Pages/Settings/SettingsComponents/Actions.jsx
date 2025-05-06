import { useForm } from "@inertiajs/react";

export default function ActionsForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        action: '',
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('actionType.store'), {
            onSuccess: () => reset() 
        });
    }

    return (
        <form onSubmit={submitForm} method="post" className="flex flex-col flex-1 gap-4 min-w-[8em] min-h-[6em] px-8 py-4 bg-sky-700 rounded-xl">
            <label htmlFor="action" className=" font-extrabold">Visit type</label>
            <input 
                type="text" 
                name="action" 
                id="action" 
                className="max-w-96 rounded-lg" 
                value={data.action} 
                onChange={e => setData('action', e.target.value)} 
            />
            {errors.action && <span className="text-red-500">{errors.action}</span>}
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
