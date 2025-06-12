
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockApprovals = [
  {
    id: 'TKT-001',
    title: 'Website Update Request',
    requestedBy: 'John Doe',
    department: 'Marketing',
    requestDate: '2024-06-10',
    priority: 'High',
    status: 'Pending',
    type: 'Internal'
  },
  {
    id: 'TKT-004',
    title: 'Social Media Campaign',
    requestedBy: 'Sarah Wilson',
    department: 'Marketing',
    requestDate: '2024-06-09',
    priority: 'Medium',
    status: 'Pending',
    type: 'External'
  },
  {
    id: 'TKT-007',
    title: 'Print Advertisement Design',
    requestedBy: 'Mike Johnson',
    department: 'Sales',
    requestDate: '2024-06-08',
    priority: 'Low',
    status: 'Under Review',
    type: 'External'
  },
];

export default function Approvals() {
  const [approvals] = useState(mockApprovals);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
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

  const filteredApprovals = approvals.filter(approval => {
    const statusMatch = statusFilter === 'all' || approval.status.toLowerCase() === statusFilter;
    const priorityMatch = priorityFilter === 'all' || approval.priority.toLowerCase() === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approvals</h1>
          <p className="text-muted-foreground mt-2">Review and approve pending requests</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Priority:</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approvals List */}
      <div className="grid gap-4">
        {filteredApprovals.map((approval) => (
          <Card key={approval.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{approval.title}</h3>
                    <Badge variant="outline">{approval.id}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Requested by: {approval.requestedBy}</span>
                    <span>Department: {approval.department}</span>
                    <span>Date: {approval.requestDate}</span>
                    <span>Type: {approval.type}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(approval.status)}>
                      {approval.status}
                    </Badge>
                    <Badge className={getPriorityColor(approval.priority)}>
                      {approval.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link to={`/approvals/${approval.id}`}>
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      View & Review
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApprovals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No approvals found matching the selected filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
