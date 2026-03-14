import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { UploadProvider } from "@/contexts/UploadContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UploadProvider>
      <div className="flex h-screen overflow-hidden bg-dp-bg">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main id="dp-scroll" className="flex-1 overflow-y-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </UploadProvider>
  );
}
