import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vendor {
  id: string;
  value: string;
  label: string;
  service: string;
}

const initialVendors: Vendor[] = [
  { id: '1', value: 'vendor-1', label: 'Creative Solutions Ltd', service: 'Design & Printing' },
  { id: '2', value: 'vendor-2', label: 'Design Hub Co', service: 'Web Development' },
  { id: '3', value: 'vendor-3', label: 'Print Masters Inc', service: 'Printing & Signage' },
  { id: '4', value: 'vendor-4', label: 'Digital Agency Pro', service: 'Digital Marketing' },
  { id: '5', value: 'vendor-5', label: 'Event Masters', service: 'Event Management' },
  { id: '6', value: 'vendor-6', label: 'Content Creators', service: 'Content Writing' }
];

export default function VendorMaster() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({ value: '', label: '', service: '' });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingVendor) {
      setVendors(vendors.map(vendor => 
        vendor.id === editingVendor.id 
          ? { ...vendor, ...formData }
          : vendor
      ));
      toast({ title: "Vendor updated successfully" });
    } else {
      const newVendor: Vendor = {
        id: Date.now().toString(),
        ...formData
      };
      setVendors([...vendors, newVendor]);
      toast({ title: "Vendor created successfully" });
    }
    
    setIsDialogOpen(false);
    setEditingVendor(null);
    setFormData({ value: '', label: '', service: '' });
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({ value: vendor.value, label: vendor.label, service: vendor.service });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
    toast({ title: "Vendor deleted successfully" });
  };

  const resetForm = () => {
    setEditingVendor(null);
    setFormData({ value: '', label: '', service: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Vendor Master</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
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
                <Label htmlFor="label">Name</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingVendor ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Value</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-mono">{vendor.value}</TableCell>
                  <TableCell>{vendor.label}</TableCell>
                  <TableCell>{vendor.service}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(vendor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(vendor.id)}
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