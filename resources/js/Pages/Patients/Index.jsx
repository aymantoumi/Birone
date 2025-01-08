import PatientsLayout from '@/Layouts/PatientsLayout';
import { Head, Link, router } from "@inertiajs/react";
import Pagination from '../Components/Pagination';
import { Ziggy } from '@/ziggy';


export default function Index({ auth, patients, queryParams = {} }) {
    // Function to handle changes in search fields
    const fieldChanged = (name, value) => {
        const newQueryParams = { ...queryParams }; // Copy existing query parameters
        if (value?.trim()) {
            newQueryParams[name] = value.trim(); // Add or update the field
        } else {
            delete newQueryParams[name]; // Remove field if value is empty
        }

        // Log for debugging
        console.log('Navigating with Query Params:', newQueryParams);

        // Update URL with new query parameters
        router.get(route('Patients.index'), newQueryParams, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Function to handle 'Enter' key press in input fields
    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return; // Only handle Enter key
        fieldChanged(name, e.target.value); // Update query params
    };

    return (
        <PatientsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Patients Management</h2>}
        >
            <Head title="Patients" />

            <div className="py-12 max-h-screen flex flex-col items-center mx-12">
                <div className=" bg-white dark:bg-gray-800 min-w-full overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="py-8 px-20 flex flex-col">
                        <table className="rounded-lg overflow-hidden">
                            <thead className="dark:bg-stone-900">
                                <tr className="font-extrabold text-xl text-stone-200">
                                    <th className="py-2">ID</th>
                                    <th className="py-2">CIN</th>
                                    <th className="py-2">Full Name</th>
                                    <th className="py-2">Gender</th>
                                    <th className="py-2">Phone Number</th>
                                    <th className="py-2">Birthdate</th>
                                </tr>
                            </thead>
                            <thead className="dark:bg-stone-700">
                                <tr className="font-extrabold text-xl">
                                    <th className="py-2"></th>
                                    <th className="py-2">
                                        <input
                                            type="text"
                                            className="max-w-80 rounded-lg"
                                            placeholder="Search by CIN"
                                            onBlur={(e) => fieldChanged('cin', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('cin', e)}
                                        />
                                    </th>
                                    <th className="py-2">
                                        <input
                                            type="text"
                                            className="max-w-80 rounded-lg"
                                            placeholder="Search by Name"
                                            onBlur={(e) => fieldChanged('name', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('name', e)}
                                        />
                                    </th>
                                    <th className="py-2">
                                        <select
                                            name="gender"
                                            id="gender"
                                            className="max-w-80 rounded-lg"
                                            onChange={(e) => fieldChanged('gender', e.target.value)}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </th>
                                    <th className="py-2">
                                        <input
                                            type="text"
                                            className="max-w-80 rounded-lg"
                                            placeholder="Search by Phone"
                                            onBlur={(e) => fieldChanged('phone', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('phone', e)}
                                        />
                                    </th>
                                    <th className="py-2"></th>
                                </tr>
                            </thead>

                            <tbody className="">
                                {patients.data.map((patient, index) => (
                                    <tr
                                        key={patient.id}
                                        className={`text-center ${index % 2 === 0 ? 'bg-stone-200' : 'bg-slate-300'
                                            } hover:bg-sky-200 hover:font-semibold transition duration-300`}
                                    >
                                        <td className="px-4 py-2 border-b border-gray-200 font-semibold">
                                            <Link href={route("Patients.show", patient.id)} className="text-blue-600 hover:underline">
                                                {patient.id}
                                            </Link>

                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">{patient.cin}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {patient.first_name} {patient.last_name}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">{patient.gender}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{patient.phone}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{patient.birth_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={patients.meta.links} />
                    </div>
                </div>
            </div>
        </PatientsLayout>
    );
}
