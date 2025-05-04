import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function InsertCheckUpResult({ data: checkUps, actionId, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        check_up: '',
        actionId: actionId,
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('action_checkup.store'));
    }

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={submitForm} className="grid gap-5 py-5 px-4">
                <h2 className="dark:text-gray-100 text-2xl font-bold mb-4">Add Check-Up Result</h2>

                <div className="flex flex-col gap-2 items-start">
                    <label htmlFor="check_up" className="dark:text-gray-100">Check-Up</label>

                    <select
                        name="check_up"
                        id="check_up"
                        value={data.check_up}
                        onChange={(e) => setData('check_up', e.target.value)}
                        className="font-bold rounded-xl w-1/2"
                        required
                    >
                        <option value="">Select Check-Up</option>
                        {checkUps.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.check_up}
                            </option>
                        ))}
                    </select>
                    {errors.check_up && (
                        <div className="text-red-500 text-sm">{errors.check_up}</div>
                    )}
                </div>

                <div className="mt-4 space-x-4">
                    <button
                        type="submit"
                        className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-green-900 text-green-200 transition-all"
                        disabled={processing}
                    >
                        Add Check-Up Result
                    </button>
                </div>
            </form>
        </Modal>
    );
}