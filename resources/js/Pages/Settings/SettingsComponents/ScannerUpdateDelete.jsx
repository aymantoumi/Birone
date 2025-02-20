import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function ScannerUpdateDelete({ scanner, onClose, onDeleteSuccess }) {
    
    const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
        scan: scanner.scan,
    });

    const handleDelete = () => {
        destroy(route('scans.destroy', scanner.id), {
            onSuccess: () => {
                onDeleteSuccess();
                onClose();
            },
            onError: () => {
                console.error('Error deleting scanner');
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('scans.update', scanner.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.error('Error updating scanner');
            },
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Scanner</h2>

                {/* Update Scanner */}
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="scan" className="font-extrabold">
                        Scanner
                    </label>
                    <input
                        type="text"
                        name="scan"
                        id="scan"
                        className="font-bold rounded-xl w-full"
                        value={data.scan}
                        onChange={(e) => setData('scan', e.target.value)}
                    />
                    {errors.scan && (
                        <span className="text-red-500">{errors.scan}</span>
                    )}
                </div>

                {/* Delete Scanner */}
                <div className="flex justify-evenly items-center mt-5">
                    <button
                        type="button"
                        className="py-2 px-6 rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold"
                        onClick={handleDelete}
                    >
                        Delete Scanner
                    </button>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="ml-2 py-2 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-700 text-white font-bold"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update Scanner'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
