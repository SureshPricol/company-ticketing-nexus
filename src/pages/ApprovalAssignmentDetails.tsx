
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApprovalAssignmentDetails() {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on the ID
  const assignmentData = {
    id: id || 'AA-001',
    company: 'TechCorp Inc.',
    location: 'Mumbai',
    branch: 'Andheri West',
    brand: 'TechBrand',
    division: 'Technology',
    department: 'Marketing',
    approver1: 'John Smith',
    approver2: 'Sarah Johnson',
    approver3: 'Mike Wilson',
    approver4: 'Lisa Brown',
    marketingHead: 'David Parker',
    status: 'Active',
    createdDate: '2024-06-01',
    lastModified: '2024-06-10',
    createdBy: 'Admin User'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/approval-assignments">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assignments
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{assignmentData.company}</h1>
            <p className="text-muted-foreground mt-2">Assignment ID: {assignmentData.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link to={`/approver-assign?edit=${assignmentData.id}`}>
            <Button>
              <UserCheck className="h-4 w-4 mr-2" />
              Assign
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-foreground">{assignmentData.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-foreground">{assignmentData.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Branch</label>
                  <p className="text-foreground">{assignmentData.branch}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Brand</label>
                  <p className="text-foreground">{assignmentData.brand}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Division</label>
                  <p className="text-foreground">{assignmentData.division}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-foreground">{assignmentData.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Approver 1 (Primary)</label>
                  <p className="text-foreground">{assignmentData.approver1}</p>
                </div>
                {assignmentData.approver2 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Approver 2</label>
                    <p className="text-foreground">{assignmentData.approver2}</p>
                  </div>
                )}
                {assignmentData.approver3 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Approver 3</label>
                    <p className="text-foreground">{assignmentData.approver3}</p>
                  </div>
                )}
                {assignmentData.approver4 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Approver 4</label>
                    <p className="text-foreground">{assignmentData.approver4}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marketing Head (Final Approver)</label>
                  <p className="text-foreground text-lg font-medium">{assignmentData.marketingHead}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(assignmentData.status)}>
                  {assignmentData.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Created Date:</span>
                <p className="text-foreground">{assignmentData.createdDate}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Last Modified:</span>
                <p className="text-foreground">{assignmentData.lastModified}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Created By:</span>
                <p className="text-foreground">{assignmentData.createdBy}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
