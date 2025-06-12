
import { ApproverAssignForm } from '@/components/ApproverAssignForm';

export default function ApproverAssign() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Approver Assignment</h1>
        <p className="text-muted-foreground mt-2">Configure approval workflows for your organization</p>
      </div>

      <ApproverAssignForm />
    </div>
  );
}
