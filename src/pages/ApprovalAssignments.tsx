
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApprovalAssignments() {
  // Mock data for approval assignments
  const approvalAssignments = [
    {
      id: 'AA-001',
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
      createdDate: '2024-06-01'
    },
    {
      id: 'AA-002',
      company: 'Digital Solutions Ltd.',
      location: 'Delhi',
      branch: 'Connaught Place',
      brand: 'DigiSol',
      division: 'Operations',
      department: 'Sales',
      approver1: 'Emma Davis',
      approver2: 'Robert Chen',
      approver3: '',
      approver4: '',
      marketingHead: 'David Parker',
      status: 'Active',
      createdDate: '2024-06-05'
    },
    {
      id: 'AA-003',
      company: 'Innovation Hub',
      location: 'Bangalore',
      branch: 'Koramangala',
      brand: 'InnoHub',
      division: 'Research',
      department: 'Development',
      approver1: 'Alex Kumar',
      approver2: 'Priya Sharma',
      approver3: 'Raj Patel',
      approver4: 'Nina Gupta',
      marketingHead: 'David Parker',
      status: 'Inactive',
      createdDate: '2024-05-28'
    }
  ];

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Assignments</h1>
          <p className="text-muted-foreground mt-2">View and manage approval workflow assignments</p>
        </div>
        <Link to="/approver-assign">
          <Button>
            <UserCheck className="h-4 w-4 mr-2" />
            Assign New
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {approvalAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{assignment.company}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {assignment.location} • {assignment.branch} • {assignment.brand}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/approval-assignments/${assignment.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Division</label>
                  <p className="text-foreground">{assignment.division}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-foreground">{assignment.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Primary Approver</label>
                  <p className="text-foreground">{assignment.approver1}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marketing Head</label>
                  <p className="text-foreground">{assignment.marketingHead}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                  <p className="text-foreground">{assignment.createdDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assignment ID</label>
                  <p className="text-foreground">{assignment.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
