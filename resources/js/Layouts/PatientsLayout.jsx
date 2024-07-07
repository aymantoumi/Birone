import NavLink from '@/Components/NavLink';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function PatientsLayout({ children, user, header }) {
    return (
        <Authenticated user={user} header={header}>
            <section className='py-16 '>
                <div className="dark:bg-gray-800 space-x-8 sm:-my-px sm:ml-10 sm:flex max-w-fit py-2 px-6 rounded-2xl ">
                    <NavLink href={route('Patients.index')} active={route().current('Patients.index')}>
                        Patients
                    </NavLink>
                    <NavLink href={route('Patients.create')} active={route().current('Patients.create')}>
                        Add Patients
                    </NavLink>
                </div>
                {children}
            </section>
        </Authenticated>
    );
}
