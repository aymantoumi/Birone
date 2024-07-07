import Authenticated from "./AuthenticatedLayout";

export default function StatisticsLayout({ children, user, header }) {

    return (
        <Authenticated user={user} header={header}> 
        <section>
            {children}
        </section>
        </Authenticated>
    )
}