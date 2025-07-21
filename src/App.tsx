
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetails from "./pages/TicketDetails";
import NewTicket from "./pages/NewTicket";
import Approvals from "./pages/Approvals";
import ApprovalDetails from "./pages/ApprovalDetails";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import NewTask from "./pages/NewTask";
import ApproverAssign from "./pages/ApproverAssign";
import ApprovalAssignments from "./pages/ApprovalAssignments";
import ApprovalAssignmentDetails from "./pages/ApprovalAssignmentDetails";
import PeriodicRequests from "./pages/PeriodicRequests";
import RequestStatusMaster from "./pages/RequestStatusMaster";
import TaskStatusMaster from "./pages/TaskStatusMaster";
import VendorMaster from "./pages/VendorMaster";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/new" element={<NewTicket />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/approvals/:id" element={<ApprovalDetails />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<NewTask />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/approver-assign" element={<ApproverAssign />} />
            <Route path="/approval-assignments" element={<ApprovalAssignments />} />
            <Route path="/approval-assignments/:id" element={<ApprovalAssignmentDetails />} />
            <Route path="/periodic-requests" element={<PeriodicRequests />} />
            <Route path="/masters/request-status" element={<RequestStatusMaster />} />
            <Route path="/masters/task-status" element={<TaskStatusMaster />} />
            <Route path="/masters/vendor" element={<VendorMaster />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
