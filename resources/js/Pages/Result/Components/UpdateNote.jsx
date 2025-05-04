import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function NoteUpdate({ data, onClose }) {
    const { data: formData, setData, put, processing } = useForm({
        note: data?.[0]?.note || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure we have at least one note object
        if (!data[0]) {
            console.error('Note data is missing');
            return;
        }

        const noteId = data[0].id;

        put(route('note.update', noteId), {
            data: { note: formData.note },
            onSuccess: () => {
                onClose(); // Close modal after successful update
            },
            onError: (errors) => {
                console.error('Failed to update note:', errors);
            }
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col px-7 py-3 gap-5">
                <label htmlFor="note" className="dark:text-gray-100 font-extrabold text-2xl">
                    Note
                </label>

                <textarea
                    name="note"
                    id="note"
                    rows="15"
                    className="rounded-xl dark:bg-gray-700 dark:text-white"
                    value={formData.note}
                    onChange={(e) => setData('note', e.target.value)}
                    required
                ></textarea>

                {processing && (
                    <p className="text-yellow-500 mt-2">Updating note...</p>
                )}

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4 max-w-fit self-start transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update'}
                </button>
            </form>
        </Modal>
    );
}