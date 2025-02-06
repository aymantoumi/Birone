import NavLink from "@/Components/NavLink";
import Authenticated from "./AuthenticatedLayout";

export default function UsersLayout({ children, user, header }) {

    return (
        <Authenticated user={user} header={header}>
            <section className="px-5 py-12">
                <div className="dark:bg-gray-800 max-w-fit px-6 py-3 rounded-xl space-x-5">
                    <NavLink href={route('usersManagement.index')} active={route().current('usersManagement.index')}>
                        Users list
                    </NavLink>
                    <NavLink href={route('usersManagement.create')} active={route().current('usersManagement.create')}>
                        Create user
                    </NavLink>
                </div>
                {children}
            </section>
        </Authenticated>
    )
}