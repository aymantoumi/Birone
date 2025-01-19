import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function ActionUpdateDeleteModal({ action, onClose }) {
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        action: action.action,
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('actionType.update', { actionType: action.id }), { 
            onSuccess: () => onClose(),
        });
    };

    const handleDelete = () => {
        destroy(route('actionType.destroy', { actionType: action.id }), { 
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="action" className="font-extrabold">Action</label>
                    <input
                        type="text"
                        name="action"
                        id="action"
                        className="font-bold rounded-xl w-full"
                        value={data.action}
                        onChange={(e) => setData('action', e.target.value)}
                    />
                    {errors.action && <span className="text-red-500">{errors.action}</span>}
                </div>
                <div className="flex justify-evenly">
                    <button type="button" onClick={handleDelete} className="bg-red-500 text-white py-2 px-6 rounded-xl font-extrabold hover:bg-red-700 hover:scale-110 transition-all" disabled={processing}>
                        Delete
                    </button>
                    <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 transition-all" disabled={processing}>
                        Update
                    </button>
                </div>
            </form>
        </Modal>
    );
}
