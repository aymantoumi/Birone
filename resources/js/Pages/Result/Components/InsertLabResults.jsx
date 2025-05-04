import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function InsertLabResult({ data: labResults, actionId, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        lab_result: '',
        actionId: actionId,
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('action_lab_result.store'));
    }

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={submitForm} className="grid gap-5 py-5 px-4">
                <h2 className="dark:text-gray-100 text-2xl font-bold mb-4">Add Lab Result</h2>

                <div className="flex flex-col gap-2 items-start">
                    <label htmlFor="lab_result" className="dark:text-gray-100">Lab Result</label>

                    <select
                        name="lab_result"
                        id="lab_result"
                        value={data.lab_result}
                        onChange={(e) => setData('lab_result', e.target.value)}
                        className="font-bold rounded-xl w-1/2"
                        required
                    >
                        <option value="">Select Lab Result</option>
                        {labResults.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.lab_results}
                            </option>
                        ))}
                    </select>
                    {errors.lab_result && (
                        <div className="text-red-500 text-sm">{errors.lab_result}</div>
                    )}
                </div>

                <div className="mt-4 space-x-4">
                    <button
                        type="submit"
                        className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-green-900 text-green-200 transition-all"
                        disabled={processing}
                    >
                        Add Lab Result
                    </button>
                </div>
            </form>
        </Modal>
    );
}