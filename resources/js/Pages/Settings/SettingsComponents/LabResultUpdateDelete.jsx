import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function LabResultUpdateDelete({ labResult, onClose, onDeleteSuccess }) {
    
    const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
        lab_results: labResult.lab_results,
    });

    const handleDelete = () => {
        destroy(route('lab_results.destroy', labResult.id), {
            onSuccess: () => {
                onDeleteSuccess();
                onClose();
            },
            onError: () => {
                console.error('Error deleting lab result');
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('lab_results.update', labResult.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.error('Error updating lab result');
            },
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Lab Result</h2>

                {/* Update Lab Result */}
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="lab_results" className="font-extrabold">
                        Lab Result
                    </label>
                    <input
                        type="text"
                        name="lab_results"
                        id="lab_results"
                        className="font-bold rounded-xl w-full"
                        value={data.lab_results}
                        onChange={(e) => setData('lab_results', e.target.value)}
                    />
                    {errors.lab_results && (
                        <span className="text-red-500">{errors.lab_results}</span>
                    )}
                </div>

                {/* Delete Lab Result */}
                <div className="flex justify-evenly items-center mt-5">
                    <button
                        type="button"
                        className="py-2 px-6 rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold"
                        onClick={handleDelete}
                    >
                        Delete Lab Result
                    </button>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="ml-2 py-2 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-700 text-white font-bold"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update Lab Result'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
