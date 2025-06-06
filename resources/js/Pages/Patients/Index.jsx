
import PatientsLayout from '@/Layouts/PatientsLayout';
import { Head, Link, router } from "@inertiajs/react";
import Pagination from '../Components/Pagination';


export default function Index({ auth, patients, queryParams = {} }) {    
    const fieldChanged = (name, value) => {
        const newQueryParams = { ...queryParams }; 
        if (value?.trim()) {
            newQueryParams[name] = value.trim(); 
        } else {
            delete newQueryParams[name]; 
        }

        router.get(route('Patients.index'), newQueryParams, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return; 
        fieldChanged(name, e.target.value); 
    };

    return (
        <PatientsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl dark:text-gray-200 leading-tight">Patients Management</h2>}
        >
            <Head title="Patients" />
        
            <div className="py-12 max-h-screen flex flex-col items-center mx-12">
                <div className=" bg-slate-200 dark:bg-gray-800 shadow-lg shadow-sky-200 min-w-full overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="py-8 px-20 flex flex-col">
                        <table className="rounded-lg overflow-hidden">
                            <thead className="dark:bg-stone-900 bg-sky-600">
                                <tr className="font-extrabold text-xl dark:text-stone-200">
                                    <th className="py-2">ID</th>
                                    <th className="py-2">CIN</th>
                                    <th className="py-2">Full Name</th>
                                    <th className="py-2">Gender</th>
                                    <th className="py-2">Phone Number</th>
                                    <th className="py-2">Birthdate</th>
                                </tr>
                            </thead>
                            <thead className="dark:bg-stone-700 bg-sky-400">
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
                                    className={`text-center cursor-pointer ${index % 2 === 0 ? 'dark:bg-stone-200 bg-sky-100' : 'dark:bg-slate-300 bg-sky-300'
                                        } hover:bg-sky-200 transition duration-300`}
                                >
                                    <td colSpan="6">
                                        <Link
                                            href={route("Patients.show", patient.id)}
                                            className="block text-black hover:text-black" 
                                        >
                                            <div className="grid grid-cols-6">
                                                <div className="px-4 py-2 border-b border-gray-200 font-semibold">
                                                    {patient.id}
                                                </div>
                                                <div className="px-4 py-2 border-b border-gray-200">{patient.cin}</div>
                                                <div className="px-4 py-2 border-b border-gray-200">
                                                    {patient.first_name} {patient.last_name}
                                                </div>
                                                <div className="px-4 py-2 border-b border-gray-200">{patient.gender}</div>
                                                <div className="px-4 py-2 border-b border-gray-200">{patient.phone}</div>
                                                <div className="px-4 py-2 border-b border-gray-200">{patient.birth_date}</div>
                                            </div>
                                        </Link>
                                    </td>
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