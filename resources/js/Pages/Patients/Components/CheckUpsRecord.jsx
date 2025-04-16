import Modal from "@/Components/Modal";
import Pagination from "@/Pages/Components/Pagination";

export default function ChackUpsRecord({ data, onClose, actionType, show }) {

    if (!data || !Array.isArray(data.data)) {
        console.error("Invalid data format: Expected paginated data with 'data' property.");
        return <div className="text-red-500">Invalid data format</div>;
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="dark:bg-gray-800 py-6 px-20 rounded-lg overflow-hidden">
                <table className="text-sm text-left w-full">
                    {/* Table Header */}
                    <thead className="dark:bg-stone-900 bg-sky-600 text-white">
                        <tr className="font-extrabold text-xl">
                            <th className="py-2 px-4">N</th>
                            <th className="py-2 px-4">Doctor</th>
                            <th className="py-2 px-4">Patient</th>
                            <th className="py-2 px-4">Visit Type</th>
                            <th className="py-2 px-4">Note</th>
                            <th className="py-2 px-4">Date</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="dark:text-black text-white">
                        {data.data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 ">
                                    No records available
                                </td>
                            </tr>
                        ) : (
                            data.data.map((item, index) => {
                                const date = item.created_at ? new Date(item.created_at) : null;
                                const formattedDate = date
                                    ? `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
                                    : 'N/A';

                                return (
                                    <tr
                                        key={index}
                                        className={`font-bold text-base text-center cursor-pointer ${index % 2 === 0
                                                ? 'dark:bg-stone-200 bg-sky-100'
                                                : 'dark:bg-slate-300 bg-sky-300'
                                            } hover:bg-sky-200 transition duration-300`}
                                    >
                                        <td className="px-4 py-2 border-b border-gray-200">{item.id}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {item.created_by?.name || 'N/A'}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {item.patient?.first_name} {item.patient?.last_name}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {item.action_type?.action || 'N/A'}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {item.note ? item.note.note : 'No note available'}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">{formattedDate}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
                {/* Pagination Component */}
                <Pagination links={data.links} />
            </div>
        </Modal>
    );
}