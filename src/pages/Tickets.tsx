
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus } from 'lucide-react';

const mockTickets = [
  {
    id: 'TKT-001',
    title: 'Website Update Request',
    type: 'Internal',
    medium: 'Website update',
    status: 'Pending',
    requestDate: '2024-06-10',
    requiredDate: '2024-06-15',
    priority: 'High'
  },
  {
    id: 'TKT-002',
    title: 'Marketing Material Design',
    type: 'External',
    medium: 'Printing',
    status: 'In Progress',
    requestDate: '2024-06-09',
    requiredDate: '2024-06-20',
    priority: 'Medium'
  },
  {
    id: 'TKT-003',
    title: 'Social Media Content',
    type: 'External',
    medium: 'Social Media post',
    status: 'Approved',
    requestDate: '2024-06-08',
    requiredDate: '2024-06-12',
    priority: 'Low'
  },
];

export default function Tickets() {
  const [tickets] = useState(mockTickets);

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tickets</h1>
          <p className="text-muted-foreground mt-2">Manage and track your requests</p>
        </div>
        <Link to="/tickets/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{ticket.title}</h3>
                    <Badge variant="outline">{ticket.id}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Type: {ticket.type}</span>
                    <span>Medium: {ticket.medium}</span>
                    <span>Requested: {ticket.requestDate}</span>
                    <span>Required: {ticket.requiredDate}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link to={`/tickets/${ticket.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
