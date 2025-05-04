import Authenticated from "./AuthenticatedLayout";

export default function ResultsLayout({ children, user, header })
{
    return (
        <Authenticated 
            user={user}
            header={header}
        >
            {children}
            
        </Authenticated>
    );
}