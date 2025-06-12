
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Plus, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockTasks = [
  {
    id: 'TSK-001',
    ticketId: 'TKT-001',
    title: 'Website Content Update',
    description: 'Update blog content and implement SEO optimizations',
    type: 'Internal',
    status: 'In Progress',
    priority: 'High',
    responsiblePerson: 'John Doe',
    startDate: '2024-06-12',
    endDate: '2024-06-15',
    vendor: null
  },
  {
    id: 'TSK-002',
    ticketId: 'TKT-002',
    title: 'Marketing Material Design',
    description: 'Create brochures and flyers for upcoming campaign',
    type: 'External',
    status: 'Pending',
    priority: 'Medium',
    responsiblePerson: 'Jane Smith',
    startDate: '2024-06-14',
    endDate: '2024-06-20',
    vendor: 'Creative Solutions Ltd'
  },
  {
    id: 'TSK-003',
    ticketId: 'TKT-003',
    title: 'Social Media Assets',
    description: 'Design social media posts and stories',
    type: 'External',
    status: 'Completed',
    priority: 'Low',
    responsiblePerson: 'Mike Johnson',
    startDate: '2024-06-08',
    endDate: '2024-06-12',
    vendor: 'Design Hub Co'
  },
];

export default function Tasks() {
  const [tasks] = useState(mockTasks);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

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

  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === 'all' || task.status.toLowerCase().replace(' ', '-') === statusFilter;
    const typeMatch = typeFilter === 'all' || task.type.toLowerCase() === typeFilter;
    return statusMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-2">Manage and track task progress</p>
        </div>
        <Link to="/tasks/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Type:</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <Badge variant="outline">{task.id}</Badge>
                    <Badge variant="outline" className="text-xs">
                      Ticket: {task.ticketId}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Responsible: {task.responsiblePerson}</span>
                    <span>Start: {task.startDate}</span>
                    <span>End: {task.endDate}</span>
                    {task.vendor && <span>Vendor: {task.vendor}</span>}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant="outline">
                      {task.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link to={`/tasks/${task.id}`}>
                    <Button variant="outline">
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

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No tasks found matching the selected filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
