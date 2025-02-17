import Sidebar from "@/components/sidebar/Sidebar";



export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-5">
                {children}
            </div>
        </div>
    );
}
