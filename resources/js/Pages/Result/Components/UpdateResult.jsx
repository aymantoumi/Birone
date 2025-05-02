import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function UpdateResult({ data, check_up, onClose }) {
    const { data: formData, setData, put, delete: destroy, processing, errors, reset } = useForm({
        check_up: data.check_up_id,
    });

    const handleDelete = () => {
        destroy(route('action_result.destroy', data.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.log('Something went wrong!');
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('action_result.update', data.id), {
            data: { check_up: formData.check_up },
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.log('Couldn\'t update data!');
            }
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleSubmit} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Check Up</h2>
                
                <div className="flex flex-col gap-2 items-center">
                    <label htmlFor="check_up" className="font-extrabold">
                        Check Up
                    </label>
                    
                    <select
                        name="check_up"
                        id="check_up"
                        className="font-bold rounded-xl w-1/2"
                        value={formData.check_up}
                        onChange={(e) => setData('check_up', parseInt(e.target.value))}
                    >
                        <option value="">Select Check Up</option>
                        {check_up && check_up.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.check_up}
                            </option>
                        ))}
                    </select>

                    {errors.check_up && (
                        <div className="text-red-500 text-sm">{errors.check_up}</div>
                    )}

                    <div className="mt-4 space-x-4">
                        <button 
                            type="button" 
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-6 rounded-xl font-extrabold hover:bg-red-700 hover:scale-110 transition-all"
                            disabled={processing}
                        >
                            Delete
                        </button>
                        
                        <button 
                            type="submit" 
                            className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-green-900 text-green-200 transition-all"
                            disabled={processing}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}