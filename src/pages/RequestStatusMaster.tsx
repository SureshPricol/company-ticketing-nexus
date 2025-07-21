import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RequestStatus {
  id: string;
  value: string;
  label: string;
}

const initialStatuses: RequestStatus[] = [
  { id: '1', value: 'draft', label: 'Draft' },
  { id: '2', value: 'rejected', label: 'Rejected' },
  { id: '3', value: 'completed', label: 'Completed' },
  { id: '4', value: 'on-hold', label: 'On Hold' },
  { id: '5', value: 'in-progress', label: 'In Progress' },
  { id: '6', value: 'pending', label: 'Pending' }
];

export default function RequestStatusMaster() {
  const [statuses, setStatuses] = useState<RequestStatus[]>(initialStatuses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<RequestStatus | null>(null);
  const [formData, setFormData] = useState({ value: '', label: '' });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStatus) {
      setStatuses(statuses.map(status => 
        status.id === editingStatus.id 
          ? { ...status, ...formData }
          : status
      ));
      toast({ title: "Status updated successfully" });
    } else {
      const newStatus: RequestStatus = {
        id: Date.now().toString(),
        ...formData
      };
      setStatuses([...statuses, newStatus]);
      toast({ title: "Status created successfully" });
    }
    
    setIsDialogOpen(false);
    setEditingStatus(null);
    setFormData({ value: '', label: '' });
  };

  const handleEdit = (status: RequestStatus) => {
    setEditingStatus(status);
    setFormData({ value: status.value, label: status.label });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setStatuses(statuses.filter(status => status.id !== id));
    toast({ title: "Status deleted successfully" });
  };

  const resetForm = () => {
    setEditingStatus(null);
    setFormData({ value: '', label: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Request Status Master</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Status
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingStatus ? 'Edit Status' : 'Add New Status'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingStatus ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Value</TableHead>
                <TableHead>Label</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statuses.map((status) => (
                <TableRow key={status.id}>
                  <TableCell className="font-mono">{status.value}</TableCell>
                  <TableCell>{status.label}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(status)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(status.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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