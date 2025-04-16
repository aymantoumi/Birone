import { useForm } from "@inertiajs/react";

export default function CheckUps() 
{
    const {data, setData, post, processing, errors, reset} = useForm({
        check_up : ''
    })

    function submitForm(e)
    {
        e.preventDefault();
        post(route('check_up.store'), {
            onSuccess: () => reset()
        })
    }

    return (
        <form 
        onSubmit={submitForm} 
        action="post"
        className="flex flex-col flex-1 gap-4 min-w-[8em] min-h-[6em] px-8 py-4 bg-stone-400 rounded-xl"
        >
            <label htmlFor="check_up" className=" font-extrabold">check up</label>
        <input 
            type="text" 
            name="check_up" 
            id="check_up" 
            className="max-w-96 rounded-lg" 
            value={data.check_up} 
            onChange={e => setData('check_up', e.target.value)} 
        />
            {errors.check_up && <span className="text-red-500">{errors.check_up}</span>}
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