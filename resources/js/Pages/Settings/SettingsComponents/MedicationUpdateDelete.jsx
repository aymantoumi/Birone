import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function MedicationUpdateDelete({ medication, onClose, onDeleteSuccess }) {
    const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
        medication_name: medication.medication_name,
        medication_class: medication.medication_class_id,
    });

    const handleDelete = () => {
        destroy(route('medications.destroy', medication.id), {
            onSuccess: () => {
                onDeleteSuccess();
                onClose();
            },
            onError: () => {
                console.error('Error deleting medication');
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('medications.update', medication.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.error('Error updating medication');
            },
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Medication</h2>

                {/* Update Medication Name */}
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="medication_name" className="font-extrabold">
                        Medication Name
                    </label>
                    <input
                        type="text"
                        name="medication_name"
                        id="medication_name"
                        className="font-bold rounded-xl w-full"
                        value={data.medication_name}
                        onChange={(e) => setData('medication_name', e.target.value)}
                    />
                    {errors.medication_name && (
                        <span className="text-red-500">{errors.medication_name}</span>
                    )}
                </div>

                {/* Update Medication Class */}
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="medication_class" className="font-extrabold">
                        Medication Class
                    </label>
                    <select
                        name="medication_class"
                        id="medication_class"
                        className="font-bold rounded-xl w-full"
                        value={data.medication_class}
                        onChange={(e) => setData('medication_class', e.target.value)}
                    >
                        {medication.medication_classes.map((medClass) => (
                            <option key={medClass.id} value={medClass.id}>
                                {medClass.medication_class}
                            </option>
                        ))}
                    </select>
                    {errors.medication_class && (
                        <span className="text-red-500">{errors.medication_class}</span>
                    )}
                </div>

                {/* Delete Medication */}
                <div className="flex justify-evenly items-center mt-5">
                    <button
                        type="button"
                        className="py-2 px-6 rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold"
                        onClick={handleDelete}
                    >
                        Delete Medication
                    </button>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="ml-2 py-2 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-700 text-white font-bold"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update Medication'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
