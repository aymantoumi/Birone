import PatientsLayout from '@/Layouts/PatientsLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {
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
                            <thead className="dark:bg-gray-300">
                                <tr className='font-extrabold text-lg'>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Gender</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Birthdate</th>
                                </tr>
                            </thead>
                            <tbody className="dark:bg-gray-100">
                                <tr className='text-center'>
                                    <td>ID</td>
                                    <td>Hello Mom</td>
                                    <td>Hello Mom</td>
                                    <td>Hello Mom</td>
                                    <td>Hello Mom</td>
                                    <td>Hello Mom</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </PatientsLayout>
    );
}
