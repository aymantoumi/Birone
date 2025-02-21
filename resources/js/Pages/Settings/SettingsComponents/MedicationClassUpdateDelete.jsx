import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function MedicationClassUpdateDelete({ medication, onClose, onDeleteSuccess }) {
    
    const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
        medication_class: medication.medication_class,
    });

    const handleDelete = () => {
        destroy(route('medicationClasses.destroy', medication.id), {
            onSuccess: () => {
                onDeleteSuccess();
                onClose();
            },
            onError: () => {
                console.error('Error deleting medication class');
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('medicationClass.update', medication.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.error('Error updating medication class');
            },
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Medication Class</h2>

                {/* Update Medication Class */}
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="medication_class" className="font-extrabold">
                        Medication Class
                    </label>
                    <input
                        type="text"
                        name="medication_class"
                        id="medication_class"
                        className="font-bold rounded-xl w-full"
                        value={data.medication_class}
                        onChange={(e) => setData('medication_class', e.target.value)}
                    />
                    {errors.medication_class && (
                        <span className="text-red-500">{errors.medication_class}</span>
                    )}
                </div>

                {/* Delete Medication Class */}
                <div className="flex justify-evenly items-center mt-5">
                    <button
                        type="button"
                        className="py-2 px-6 rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold"
                        onClick={handleDelete}
                    >
                        Delete Medication Class
                    </button>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="ml-2 py-2 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-700 text-white font-bold"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update Medication Class'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}