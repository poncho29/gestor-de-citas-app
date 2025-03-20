import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen relative">
            <Sidebar />
            <div className="flex-1 transition-all duration-300 ease-in-out">
                {children}
                <Toaster />
            </div>
        </div>
    );
}
