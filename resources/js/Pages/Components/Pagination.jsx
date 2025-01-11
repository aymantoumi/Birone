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
                        "inline-block py-2 px-3 rounded-lg dark:text-gray-200 text-xs " + 
                        (link.active ? 'dark:bg-slate-500 bg-emerald-300 ' : '') +
                        (!link.url ? "dark:text-gray-500  cursor-not-allowed" : "dark:hover:bg-slate-500 hover:bg-emerald-200")
                    }
                />
            ))}
        </nav>
    );
}
