import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="px-4 pt-8 bg-gray-100 h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
