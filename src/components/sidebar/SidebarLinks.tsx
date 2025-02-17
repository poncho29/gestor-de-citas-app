import Link from 'next/link'

interface SidebarLinkProps {
    href: string;
    text: string;
    icon: React.ReactNode;
}
const SidebarLink: React.FC<SidebarLinkProps> = ({ href, text, icon }) => {
    return (
        <Link href={href} className="flex items-center font-medium text-sm 
         text-gray-700 py-2 px-3 hover:bg-blue-500 hover:text-white 
         hover:scale-105 rounded-md transition duration-150 ease-in-out">
            {icon}
            <span className="px-2">{text}</span>
        </Link>
    )
}

export default SidebarLink
