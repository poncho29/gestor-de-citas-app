import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
    href: string;
    text: string;
    icon: React.ReactNode;
}
const SidebarLink: React.FC<SidebarLinkProps> = ({ href, text, icon }) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center font-medium text-sm text-gray-700 py-2 px-3 hover:bg-blue-400 hover:text-white rounded-md",
                pathname === href ? "bg-blue-500 text-white" : ""
            )}
        >
            {icon}
            <span className="px-2">{text}</span>
        </Link>
    )
}

export default SidebarLink
