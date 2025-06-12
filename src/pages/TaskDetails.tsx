
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Clock, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TaskDetails() {
  const { id } = useParams();

  // Mock data
  const taskData = {
    id: id || 'TSK-001',
    ticketId: 'TKT-001',
    title: 'Website Content Update',
    description: 'Update blog content and implement SEO optimizations. This includes creating new blog posts, updating existing content, and ensuring all content is properly optimized for search engines.',
    type: 'Internal',
    status: 'In Progress',
    priority: 'High',
    responsiblePerson: 'John Doe',
    startDate: '2024-06-12',
    endDate: '2024-06-15',
    vendor: null,
    createdDate: '2024-06-10',
    lastUpdated: '2024-06-12',
    progress: 65,
    estimatedHours: 40,
    actualHours: 26,
    comments: [
      {
        id: 1,
        author: 'John Doe',
        message: 'Started working on the SEO optimization. Completed keyword research.',
        timestamp: '2024-06-12 09:30 AM'
      },
      {
        id: 2,
        author: 'Jane Smith',
        message: 'Please ensure all images have proper alt tags.',
        timestamp: '2024-06-12 02:15 PM'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
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
          <Link to="/tasks">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{taskData.title}</h1>
            <p className="text-muted-foreground mt-2">
              Task ID: {taskData.id} • Related Ticket: {taskData.ticketId}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-foreground mt-1">{taskData.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Task Type</label>
                  <p className="text-foreground">{taskData.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Responsible Person</label>
                  <p className="text-foreground">{taskData.responsiblePerson}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                  <p className="text-foreground">{taskData.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">End Date</label>
                  <p className="text-foreground">{taskData.endDate}</p>
                </div>
              </div>

              {taskData.vendor && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vendor</label>
                  <p className="text-foreground">{taskData.vendor}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress & Time Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Progress & Time Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{taskData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${taskData.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Estimated Hours</label>
                  <p className="text-foreground">{taskData.estimatedHours} hours</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Actual Hours</label>
                  <p className="text-foreground">{taskData.actualHours} hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Comments & Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {taskData.comments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {comment.author}
                    </span>
                    <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-foreground">{comment.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(taskData.status)}>
                  {taskData.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Priority:</span>
                <Badge className={getPriorityColor(taskData.priority)}>
                  {taskData.priority}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Type:</span>
                <Badge variant="outline">
                  {taskData.type}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Created:</span>
                <p className="text-foreground">{taskData.createdDate}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Last Updated:</span>
                <p className="text-foreground">{taskData.lastUpdated}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Related Ticket:</span>
                <Link to={`/tickets/${taskData.ticketId}`} className="text-primary hover:underline">
                  {taskData.ticketId}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
