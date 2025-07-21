import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Edit, Plus, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { requestStatuses } from '@/data/formData';
import { useState } from 'react';

export default function TicketDetails() {
  const { id } = useParams();
  const [status, setStatus] = useState('pending');
  const [comment, setComment] = useState('');

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
    currentStage: 'Pending Manager Approval',
    company: 'ABC Corporation',
    location: 'Mumbai',
    branch: 'Main Branch',
    brand: 'Brand Alpha',
    division: 'Marketing',
    departmentDetails: 'Digital Marketing'
  };

  // Mock tasks data for this ticket
  const ticketTasks = [
    { id: 'TSK-001', title: 'Design Blog Layout', status: 'completed', hours: 8, progress: 100 },
    { id: 'TSK-002', title: 'Write Blog Content', status: 'in-progress', hours: 6, progress: 60 },
    { id: 'TSK-003', title: 'SEO Optimization', status: 'pending', hours: 0, progress: 0 },
  ];

  const totalTasks = ticketTasks.length;
  const completedTasks = ticketTasks.filter(task => task.status === 'completed').length;
  const totalHours = ticketTasks.reduce((sum, task) => sum + task.hours, 0);
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Mock approval workflow
  const approvalWorkflow = [
    { stage: 'Manager Approval', approver: 'Jane Smith', status: 'pending', date: null },
    { stage: 'Senior Manager Approval', approver: 'Priya Sharma', status: 'waiting', date: null },
    { stage: 'Director Approval', approver: 'Amit Singh', status: 'waiting', date: null },
  ];

  const comments = [
    { id: 1, author: 'John Doe', message: 'Initial request submitted for review', timestamp: '2024-06-10 10:00 AM' },
    { id: 2, author: 'Jane Smith', message: 'Request looks good, proceeding to next approval level', timestamp: '2024-06-11 02:30 PM' },
  ];

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
          <Link to={`/tasks/new?ticketId=${ticketData.id}`}>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </Link>
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
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tasks Completed</span>
                  <span>{completedTasks} of {totalTasks} tasks</span>
                </div>
                <Progress value={progressPercentage} className="w-full" />
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Total Hours: {totalHours}</span>
                </div>
                <div>
                  <span>Progress: {progressPercentage.toFixed(0)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
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

          {/* Request For Details */}
          <Card>
            <CardHeader>
              <CardTitle>Request For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-foreground">{ticketData.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-foreground">{ticketData.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Branch</label>
                  <p className="text-foreground">{ticketData.branch}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Brand</label>
                  <p className="text-foreground">{ticketData.brand}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Division</label>
                  <p className="text-foreground">{ticketData.division}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-foreground">{ticketData.departmentDetails}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Related Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ticketTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">ID: {task.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Hours: </span>
                        <span>{task.hours}</span>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Link to={`/tasks/${task.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Approval Workflow */}
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalWorkflow.map((approval, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      approval.status === 'completed' ? 'bg-green-500' :
                      approval.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{approval.stage}</p>
                      <p className="text-sm text-muted-foreground">Approver: {approval.approver}</p>
                    </div>
                    <Badge variant={approval.status === 'completed' ? 'default' : 'secondary'}>
                      {approval.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-foreground">{comment.message}</p>
                </div>
              ))}
              
              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end">
                  <Button size="sm">Add Comment</Button>
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
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Update Status:</span>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {requestStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
