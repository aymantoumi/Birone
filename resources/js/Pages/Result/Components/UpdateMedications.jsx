import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function UpdateDeleteMedication({ data, medication, onClose, onDeleteSuccess }) {

    const { data: formData, setData, put, delete: destroy, processing, errors, reset } = useForm({
        medication: data.medication_id 
    });

    const handelDelete = () => {
        destroy(route('action_medication.destroy', data.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.log('Something went wrong!');
            }
        });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        
        put(route('action_medication.update', data.id), {
            data: { medication: formData.medication }, 
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
            <form onSubmit={handelSubmit} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Medication</h2>

                <div className="flex flex-col gap-2 items-center">
                    <label htmlFor="medication" className="font-extrabold">
                        Medication
                    </label>
                    
                    <select
                        name="medication"
                        id="medication"
                        className="font-bold rounded-xl w-1/2"
                        value={formData.medication}
                        onChange={(e) => setData('medication', parseInt(e.target.value))}
                    >
                        <option value="">Select Medication</option>
                        {medication && medication.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.medication}
                            </option>
                        ))}
                    </select>

                    {errors.medication && (
                        <div className="text-red-500 text-sm">{errors.medication}</div>
                    )}

                    <div className="mt-4 space-x-4">
                        <button 
                            type="button" 
                            onClick={handelDelete}
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