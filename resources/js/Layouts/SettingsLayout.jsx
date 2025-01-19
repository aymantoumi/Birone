import Authenticated from "./AuthenticatedLayout";

export default function Settings({ children, user, header }) {

    return (
        <Authenticated user={user} header={header} >
            <section>
                {children}
            </section>
        </Authenticated>
     );
}