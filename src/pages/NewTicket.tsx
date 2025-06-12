
import { RequestorForm } from '@/components/RequestorForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewTicket() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/tickets">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">New Request</h1>
          <p className="text-muted-foreground mt-2">Create a new ticket request</p>
        </div>
      </div>

      <RequestorForm />
    </div>
  );
}
