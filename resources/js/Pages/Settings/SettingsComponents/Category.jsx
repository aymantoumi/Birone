import { useForm } from "@inertiajs/react";

export default function Categories() 
{
    const {data, setData, post, processing, errors, reset} = useForm({
        category: '',
    })
    function submitForm(e) {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => reset()
        })
    }
    return (
        <form onSubmit={submitForm} method="post" className="flex flex-col flex-1 gap-4 min-w-[8em] min-h-[6em] px-8 py-4 bg-sky-700 rounded-xl">
        <label htmlFor="category" className=" font-extrabold">Category</label>
        <input 
            type="text" 
            name="category" 
            id="category" 
            className="max-w-96 rounded-lg" 
            value={data.category} 
            onChange={e => setData('category', e.target.value)} 
        />
            {errors.category && <span className="text-red-500">{errors.category}</span>}
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