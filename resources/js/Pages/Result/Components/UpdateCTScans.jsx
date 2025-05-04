import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function UpdateDeleteCTScans({ data, CTScans, onClose, onDeleteSuccess }) {
    const { data: formData, setData, put, delete: destroy, proccessing, errors, reset } = useForm({
        ct_scans: data.scanner_id,
    })

    const handleDelete = () => {
        destroy(route('action_scan.destroy', data.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.log('Something went wrong');
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('action_scan.update', data.id), {
            data: { ct_scans: formData.ct_scans },
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
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleSubmit} className="grid gap-5 py-5 px-4" >
                <h2 className="text-2xl font-bold mb-4">Update or delete CT Scans </h2>
                <div className="flex flex-col gap-2 items-center">
                    <label htmlFor="ct_scans" className="font-extrabold"> CT Scans </label>

                    <select
                        name="ct_scans"
                        id="ct_scans"
                        className="font-bold rounded-xl w-1/2"
                        value={formData.ct_scans}
                        onChange={(e) => setData('ct_scans', parseInt(e.target.value))}
                    >
                        <option value="">Select CT Scans </option>
                        {CTScans && CTScans.map((item, index) => (
                            <option key={index} value={item.id} > {item.scan} </option>
                        ))}
                    </select>
                    {errors.CTScans && (
                        <div className="text-red-500 text-sm" >{errors.CTScans}</div>
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