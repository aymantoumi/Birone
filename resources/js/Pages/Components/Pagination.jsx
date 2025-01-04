import { Link } from "@inertiajs/react";

export default function Pagination({ links = [] }) {
    return (
        <nav className="text-center mt-4">
            {links.map((link, index) => (
                <Link 
                    key={index} 
                    href={link.url || '#'} 
                    dangerouslySetInnerHTML={{ __html: link.label }} 
                    className={
                        "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " + 
                        (link.active ? 'bg-slate-500 ' : '') +
                        (!link.url ? "text-gray-500  cursor-not-allowed" : "hover:bg-slate-500")
                    }
                />
            ))}
        </nav>
    );
}
