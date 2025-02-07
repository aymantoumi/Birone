import UsersLayout from "@/Layouts/Users";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from '../Components/Pagination';

export default function Index({ auth, users, queryParams = {} }) {
    const fieldChanged = (name, value) => {
        const newQueryParams = { ...queryParams };
        if (value?.trim()) {
            newQueryParams[name] = value.trim();
        } else {
            delete newQueryParams[name];
        }

        router.get(route('usersManagement.index'), newQueryParams, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        fieldChanged(name, e.target.value);
    };

    return (
        <UsersLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users Management</h2>}
        >
            <Head title="Users Management" />

            <div className="py-12 max-h-screen flex flex-col items-center mx-12">
                <div className="bg-slate-200 dark:bg-gray-800 shadow-lg shadow-sky-200 min-w-full overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="py-8 px-20 flex flex-col">
                        <table className="rounded-lg overflow-hidden">
                            <thead className="dark:bg-stone-900 bg-sky-600">
                                <tr className="font-extrabold text-xl dark:text-stone-200">
                                    <th className="py-2">ID</th>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Email</th>
                                    <th className="py-2">Role</th>
                                </tr>
                            </thead>
                            <thead className="dark:bg-stone-700 bg-sky-400">
                                <tr className="font-extrabold text-xl">
                                    <th className="py-2"></th>
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
                                        <input
                                            type="text"
                                            className="max-w-80 rounded-lg"
                                            placeholder="Search by Email"
                                            onBlur={(e) => fieldChanged('email', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('email', e)}
                                        />
                                    </th>
                                    <th className="py-2">
                                        <input
                                            type="text"
                                            className="max-w-80 rounded-lg"
                                            placeholder="Search by Role"
                                            onBlur={(e) => fieldChanged('role', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('role', e)}
                                        />
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.data.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`text-center ${index % 2 === 0 ? 'dark:bg-stone-200 bg-sky-100' : 'dark:bg-slate-300 bg-sky-300'} hover:bg-sky-200 transition duration-300`}
                                    >
                                        <td className="px-4 py-2 border-b border-gray-200 font-semibold">
                                            <Link href={route("usersManagement.edit", user.id)} className="text-blue-600 hover:underline">
                                                {user.id}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">{user.name}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{user.email}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={users.links} />
                    </div>
                </div>
            </div>
        </UsersLayout>
    );
}