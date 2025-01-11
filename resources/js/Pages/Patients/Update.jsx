import { useState } from 'react';
import Modal from '@/Components/Modal'; 
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Update({ action, onClose }) {
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        action: action.action,
        payment: action.payment,
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('actions.update', { action: action.id }), {
            onSuccess: () => onClose(),
        });
    };

    const handleDelete = () => {
        destroy(route('actions.destroy', { action: action.id }), {
            onSuccess: () => onClose(),
        });
    };
    const formattedDate = new Date(action.created_at).toISOString().split('T')[0];

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={handleUpdate} className="grid gap-5 py-5 px-4">
                <div className="flex justify-between gap-2 items-center dark:text-stone-200 font-extrabold">
                <span className="">
                    N : {action.id}
                </span>
                <span>
                    {formattedDate}
                </span>
                </div>
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="action" className="dark:text-stone-200 font-extrabold">Action</label>
                    <select
                        name="action"
                        id="action"
                        className="font-bold rounded-xl w-1/2"
                        value={data.action}
                        onChange={(e) => setData('action', e.target.value)}
                    >
                        <option value="visit">Visit</option>
                        <option value="consultation">Consultation</option>
                    </select>
                    {errors.action && <span className="text-red-500">{errors.action}</span>}
                </div>
                <div className="flex justify-between gap-2 items-center">
                    <label htmlFor="payment" className="dark:text-stone-200 font-extrabold">Payment</label>
                    <input
                        type="number"
                        name="payment"
                        id="payment"
                        className="font-bold rounded-xl w-1/2"
                        value={data.payment}
                        onChange={(e) => setData('payment', e.target.value)}
                    />
                    {errors.payment && <span className="text-red-500">{errors.payment}</span>}
                </div>
                <div className="flex justify-evenly">
                    <button type="button" onClick={handleDelete} className="bg-red-500 text-white py-2 px-6 rounded-xl font-extrabold hover:bg-red-700 hover:scale-110 transition-all" disabled={processing}>
                        Delete
                    </button>
                    <button type="submit" className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-green-900 text-green-200 transition-all" disabled={processing}>
                        Update
                    </button>
                </div>
            </form>
        </Modal>
    );
}
