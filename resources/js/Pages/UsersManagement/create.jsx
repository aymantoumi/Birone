import UsersLayout from "@/Layouts/Users";
import { Head, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('usersManagement.store'));
    };

    return (
        <UsersLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create User</h2>}>
            <Head title="Create User" />
            <section className="flex flex-col justify-evenly px-20 py-16 gap-8">
                <form onSubmit={submit} className="space-y-6 flex flex-col items-center bg-slate-200 dark:bg-gray-800 px-16 py-5 rounded-xl max-w-fit">
                    <div className="flex gap-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                            <InputError message={errors.email} />
                        </div>
                    </div>
                    <div className="flex gap-6 justify-center">
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                            <InputError message={errors.password} />
                        </div>
                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="role" value="Role" />
                        <select
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            required
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <InputError message={errors.role} />
                    </div>
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </form>
            </section>
        </UsersLayout>
    );
}
