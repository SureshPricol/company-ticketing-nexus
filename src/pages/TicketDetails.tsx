
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TicketDetails() {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on the ID
  const ticketData = {
    id: id || 'TKT-001',
    title: 'Website Update Request',
    status: 'Pending',
    priority: 'High',
    requestType: 'Internal',
    medium: 'Website update',
    typeOfContent: 'Blogs',
    reason: 'We need to update our company blog with the latest product announcements and feature updates to keep our customers informed.',
    additionalSpecs: 'Please include SEO-optimized content with relevant keywords. The blog should be mobile-responsive and include social sharing buttons.',
    roiExpected: 'Increased website traffic by 25% and improved customer engagement',
    requestDate: '2024-06-10',
    requiredDate: '2024-06-15',
    requestedBy: 'John Doe',
    department: 'Marketing',
    approver: 'Jane Smith',
    currentStage: 'Pending Manager Approval'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/tickets">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{ticketData.title}</h1>
            <p className="text-muted-foreground mt-2">Ticket ID: {ticketData.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Request Type</label>
                  <p className="text-foreground">{ticketData.requestType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Medium</label>
                  <p className="text-foreground">{ticketData.medium}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type of Content</label>
                  <p className="text-foreground">{ticketData.typeOfContent}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Reason for Requirement</label>
                <p className="text-foreground mt-1">{ticketData.reason}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Additional Specifications</label>
                <p className="text-foreground mt-1">{ticketData.additionalSpecs}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">ROI Expected</label>
                <p className="text-foreground mt-1">{ticketData.roiExpected}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Request Date</label>
                  <p className="text-foreground">{ticketData.requestDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Required Date</label>
                  <p className="text-foreground">{ticketData.requiredDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Priority</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(ticketData.status)}>
                  {ticketData.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Priority:</span>
                <Badge className={getPriorityColor(ticketData.priority)}>
                  {ticketData.priority}
                </Badge>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Current Stage:</span>
                <p className="text-foreground mt-1">{ticketData.currentStage}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Requested By:</span>
                <p className="text-foreground">{ticketData.requestedBy}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Department:</span>
                <p className="text-foreground">{ticketData.department}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Assigned Approver:</span>
                <p className="text-foreground">{ticketData.approver}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
