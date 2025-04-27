import NavLink from '@/Components/NavLink';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PatientsLayout({ children, user, header }) {
    return (
        <Authenticated user={user} header={header}>
            <section className='py-16 '>
                <div className="dark:bg-gray-800 bg-sky-700 space-x-8 sm:-my-px sm:ml-10 sm:flex max-w-fit py-2 px-6 rounded-2xl ">
                    <NavLink href={route('Patients.index')} active={route().current('Patients.index')}>
                        Patients
                    </NavLink>
                    <NavLink href={route('Patients.create')} active={route().current('Patients.create')}>
                        Add Patients
                    </NavLink>
                </div>
                {children}
                <ToastContainer
                    position="top-right" // Position the toast at the top-right corner
                    autoClose={3000} // Auto-close after 3 seconds
                    hideProgressBar={false} // Show progress bar
                    newestOnTop={true} // Show new notifications on top
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>
        </Authenticated>
    );
}
