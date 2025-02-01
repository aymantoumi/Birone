import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function CategoryUpdateDelete({ category, onClose, onDeleteSuccess }) {
    const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
        category_name: category.category,
    });    

    const handleDelete = () => {
        destroy(route('categories.destroy', category.id), {
            onSuccess: () => {
                onDeleteSuccess();
                onClose();
            },
            onError: () => {
                console.error('Error deleting category');
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                console.error('Error updating category');
            }
        });
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <h2 className="text-2xl font-bold mb-4">Update or Delete Category</h2>

                {/* Update Category */}
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="category_name" className="font-extrabold">Category Name</label>
                    <input
                        type="text"
                        name="category_name"
                        id="category_name"
                        className="font-bold rounded-xl w-full"
                        value={data.category_name}
                        onChange={(e) => setData('category_name', e.target.value)}
                    />
                    {errors.category_name && <span className="text-red-500">{errors.category_name}</span>}
                </div>

                {/* Delete Category */}
                <div className="flex justify-evenly items-center mt-5">
                    <button
                        type="button"
                        className="py-2 px-6 rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold"
                        onClick={handleDelete}
                    >
                        Delete Category
                    </button>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="ml-2 py-2 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-700 text-white font-bold"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update Category'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
