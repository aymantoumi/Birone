import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function UpdateLabResults({ data, labResults, onClose, onDeleteSuccess }) {
    const { data: formData, setData, put, delete: destroy, proccessing, errors, reset } = useForm({
        lab_result: data.lab_result_id
    })

    const handleDelete = () => {
        destroy(route('action_lab_result.destroy', data.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.log('Somehting went wrong');
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('action_lab_result.update', data.id), {
            data: { lab_result: formData.lab_result },
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.log('Update went wrong');
            }
        })
    }

    return (
        <Modal show={true} onClose={onClose} >
            <form onSubmit={handleSubmit} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4" > Update Laboratory Results</h2>
                <div className="flex flex-col gap-2 items-center">
                    <label htmlFor="lab_result"> Laboratory Result </label>

                    <select
                        name="lab_result"
                        id="lab_result"
                        className="font-bold rounded-xl w-1/2"
                        value={formData.lab_result}
                        onChange={(e) => setData('lab_result', parseInt(e.target.value))}
                    >
                        <option value="">Select Laboratory Result</option>
                        {labResults && labResults.map((item, index) => (
                            <option key={index} value={item.id} > {item.lab_results} </option>
                        ))}

                    </select>
                    {errors.lab_result && (
                        <div className="text-red-500 text-sm" >{errors.lab_result}</div>
                    )}
                    <div className="mt-4 space-x-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-6 rounded-xl font-extrabold hover:bg-red-700 hover:scale-110 transition-all"
                            disabled={proccessing}
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-green-900 text-green-200 transition-all"
                            disabled={proccessing}
                        >
                            Update
                        </button>

                    </div>
                </div>
            </form>
        </Modal>
    );
}