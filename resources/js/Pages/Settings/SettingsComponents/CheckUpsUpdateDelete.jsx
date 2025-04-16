import { useState } from 'react'; // Import useState
import { useForm } from '@inertiajs/react'; // Import useForm
import Modal from '@/Components/Modal';

export default function CheckUpUpdateDelete({ check_up, onClose, onDeleteSuccess = () => {} }) {
    const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
        check_up: check_up?.check_up || '', // Default value for check_up
    });

    const [errorMessage, setErrorMessage] = useState(''); // Use useState for errorMessage

    const handleDelete = () => {
        destroy(route('check_up.destroy', check_up.id), {
            onSuccess: () => {
                if (onDeleteSuccess) onDeleteSuccess(); // Call onDeleteSuccess if provided
                onClose();
            },
            onError: () => {
                setErrorMessage('Error deleting check-up');
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('check_up.update', check_up.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.error('Error updating check-up');
            },
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <span className='py-3 px-6 text-yellow-300 font-extrabold text-lg'>
                {processing ? 'Updating...' : 'Update Check Up'}
            </span>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Check Up</h2>

                {/* Error Message */}
                {errorMessage && (
                    <div className="text-red-500 text-center">{errorMessage}</div>
                )}

                {/* Update Check Up */}
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="check_up" className="font-extrabold">
                        Check Up
                    </label>
                    <input
                        type="text"
                        name="check_up"
                        id="check_up"
                        className="font-bold rounded-xl w-full"
                        value={data.check_up}
                        onChange={(e) => setData('check_up', e.target.value)}
                    />
                    {errors.check_up && (
                        <span className="text-red-500">{errors.check_up}</span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-evenly items-center mt-5">
                    <button
                        type="button"
                        className="py-2 px-6 rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold"
                        onClick={handleDelete}
                    >
                        Delete Check Up
                    </button>

                    <button
                        type="submit"
                        className="ml-2 py-2 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-700 text-white font-bold"
                        disabled={processing}
                    >
                        Update Check up
                    </button>
                </div>
            </form>
        </Modal>
    );
}