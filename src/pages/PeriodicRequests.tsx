import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PeriodicRequest {
  id: string;
  title: string;
  description: string;
  frequency: string;
  priority: string;
  status: string;
  nextDue: string;
  approver: string;
  createdAt: string;
}

const initialRequests: PeriodicRequest[] = [
  {
    id: '1',
    title: 'Monthly Newsletter Design',
    description: 'Design and create monthly newsletter for internal communication',
    frequency: 'Monthly',
    priority: 'medium',
    status: 'active',
    nextDue: '2024-02-01',
    approver: 'Rajesh Kumar (Manager)',
    createdAt: '2024-01-15'
  },
  {
    id: '2', 
    title: 'Quarterly Brand Review',
    description: 'Review and update brand guidelines quarterly',
    frequency: 'Quarterly',
    priority: 'high',
    status: 'pending',
    nextDue: '2024-03-31',
    approver: 'Amit Singh (Director)',
    createdAt: '2024-01-10'
  }
];

export default function PeriodicRequests() {
  const [requests, setRequests] = useState<PeriodicRequest[]>(initialRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: '',
    priority: '',
    approver: '',
    nextDue: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: PeriodicRequest = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setRequests([...requests, newRequest]);
    toast({ title: "Periodic request created successfully and sent for approval" });
    setIsDialogOpen(false);
    setFormData({
      title: '',
      description: '',
      frequency: '',
      priority: '',
      approver: '',
      nextDue: ''
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      pending: 'secondary',
      overdue: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleCreateTicket = (request: PeriodicRequest) => {
    // Navigate to new ticket page with pre-filled data
    navigate('/tickets/new', { 
      state: { 
        periodicRequest: request,
        title: request.title,
        description: request.description,
        priority: request.priority
      } 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Periodic Requests</h1>
          <p className="text-muted-foreground">Manage recurring requests with automated approval workflow</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Periodic Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Periodic Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency *</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Half-yearly">Half-yearly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="approver">Approver *</Label>
                  <Select value={formData.approver} onValueChange={(value) => setFormData({ ...formData, approver: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select approver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rajesh Kumar (Manager)">Rajesh Kumar (Manager)</SelectItem>
                      <SelectItem value="Priya Sharma (Senior Manager)">Priya Sharma (Senior Manager)</SelectItem>
                      <SelectItem value="Amit Singh (Director)">Amit Singh (Director)</SelectItem>
                      <SelectItem value="Sunita Patel (VP)">Sunita Patel (VP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nextDue">Next Due Date *</Label>
                  <Input
                    id="nextDue"
                    type="date"
                    value={formData.nextDue}
                    onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create & Send for Approval
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Periodic Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>{request.frequency}</TableCell>
                  <TableCell>
                    <Badge variant={request.priority === 'high' ? 'destructive' : request.priority === 'medium' ? 'default' : 'secondary'}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      {getStatusBadge(request.status)}
                    </div>
                  </TableCell>
                  <TableCell>{request.nextDue}</TableCell>
                  <TableCell>{request.approver}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === 'active' && (
                        <Button 
                          size="sm"
                          onClick={() => handleCreateTicket(request)}
                        >
                          Create Ticket
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}