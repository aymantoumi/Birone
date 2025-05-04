import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function InsertScanner({ data: scanners, actionId, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        scanner: '',
        actionId: actionId,
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('action_scan.store'));
    }

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={submitForm} className="grid gap-5 py-5 px-4">
                <h2 className="dark:text-gray-100 text-2xl font-bold mb-4">Add Scanner</h2>

                <div className="flex flex-col gap-2 items-start">
                    <label htmlFor="scanner" className="dark:text-gray-100">Scanner</label>

                    <select
                        name="scanner"
                        id="scanner"
                        value={data.scanner}
                        onChange={(e) => setData('scanner', e.target.value)}
                        className="font-bold rounded-xl w-1/2"
                        required
                    >
                        <option value="">Select Scanner</option>
                        {scanners.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.scan} {/* Matches Scanner model's 'scan' field */}
                            </option>
                        ))}
                    </select>
                    {errors.scanner && (
                        <div className="text-red-500 text-sm">{errors.scanner}</div>
                    )}
                </div>

                <div className="mt-4 space-x-4">
                    <button
                        type="submit"
                        className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-green-900 text-green-200 transition-all"
                        disabled={processing}
                    >
                        Add Scanner
                    </button>
                </div>
            </form>
        </Modal>
    );
}