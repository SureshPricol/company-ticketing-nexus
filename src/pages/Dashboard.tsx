
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, CheckSquare, ClipboardList, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Tickets',
      value: '156',
      icon: Ticket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Approvals',
      value: '23',
      icon: CheckSquare,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Active Tasks',
      value: '42',
      icon: ClipboardList,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Overdue Items',
      value: '8',
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const recentTickets = [
    { id: 'TKT-001', title: 'Website Update Request', status: 'Pending', date: '2024-06-10' },
    { id: 'TKT-002', title: 'Marketing Material Design', status: 'In Progress', date: '2024-06-09' },
    { id: 'TKT-003', title: 'Social Media Content', status: 'Approved', date: '2024-06-08' },
    { id: 'TKT-004', title: 'Print Advertisement', status: 'Pending', date: '2024-06-07' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your ticketing system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-foreground">{ticket.title}</h3>
                  <p className="text-sm text-muted-foreground">{ticket.id}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    ticket.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ticket.status}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{ticket.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
