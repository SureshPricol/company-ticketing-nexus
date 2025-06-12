
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check, X, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function ApprovalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Jane Smith',
      role: 'Manager',
      message: 'This looks good, but please add more details about the timeline.',
      timestamp: '2024-06-11 10:30 AM'
    }
  ]);

  // Mock data
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
    department: 'Marketing'
  };

  const handleApprove = () => {
    if (comment.trim()) {
      toast({
        title: "Request Approved",
        description: "The request has been approved successfully.",
      });
      navigate('/approvals');
    } else {
      toast({
        title: "Comment Required",
        description: "Please add a comment before approving.",
        variant: "destructive",
      });
    }
  };

  const handleReject = () => {
    if (comment.trim()) {
      toast({
        title: "Request Rejected",
        description: "The request has been rejected.",
      });
      navigate('/approvals');
    } else {
      toast({
        title: "Comment Required",
        description: "Please add a comment before rejecting.",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: 'Current User',
        role: 'Approver',
        message: comment,
        timestamp: new Date().toLocaleString()
      };
      setComments([...comments, newComment]);
      setComment('');
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the request.",
      });
    }
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
          <Link to="/approvals">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Approvals
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Review Request</h1>
            <p className="text-muted-foreground mt-2">Ticket ID: {ticketData.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(ticketData.status)}>
            {ticketData.status}
          </Badge>
          <Badge className={getPriorityColor(ticketData.priority)}>
            {ticketData.priority}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{ticketData.title}</CardTitle>
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

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comments & Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{comment.author}</span>
                      <Badge variant="outline">{comment.role}</Badge>
                    </div>
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
            </CardContent>
          </Card>

          {/* Approval Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Review & Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Add Comment</label>
                <Textarea
                  placeholder="Add your review comments..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button onClick={handleAddComment} variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
                <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button onClick={handleReject} variant="destructive" className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
