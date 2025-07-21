
import { useState } from 'react';
import { 
  Home, 
  Ticket, 
  CheckSquare, 
  ClipboardList, 
  UserCheck,
  Users,
  Menu,
  X,
  Settings,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Ticket', href: '/tickets', icon: Ticket },
  { name: 'Approval', href: '/approvals', icon: CheckSquare },
  { name: 'Task', href: '/tasks', icon: ClipboardList },
  { name: 'Approver Assign', href: '/approver-assign', icon: UserCheck },
  { name: 'Approval Assignments', href: '/approval-assignments', icon: Users },
  { name: 'Periodic Requests', href: '/periodic-requests', icon: Calendar },
];

const masterItems = [
  { name: 'Request Status', href: '/masters/request-status', icon: Settings },
  { name: 'Task Status', href: '/masters/task-status', icon: Settings },
  { name: 'Vendor Master', href: '/masters/vendor', icon: Settings },
];

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mastersOpen, setMastersOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-lg font-semibold text-foreground">Ticketing System</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* Masters Section */}
            <div className="pt-4">
              <button
                onClick={() => setMastersOpen(!mastersOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  Masters
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", mastersOpen && "rotate-180")} />
              </button>
              
              {mastersOpen && (
                <div className="ml-6 mt-2 space-y-1">
                  {masterItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <div className="flex items-center h-16 px-4 bg-card border-b lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Welcome to Ticketing System
            </div>
          </div>
        </div>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
