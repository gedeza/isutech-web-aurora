import React, { useEffect, useState } from 'react';
import { contactApi } from '../../../utils/api';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Mail } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

const ContactsDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await contactApi.getAll();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      await contactApi.updateStatus(id, status);
      setContacts(contacts.map(contact =>
        contact._id === id ? { ...contact, status } : contact
      ));
    } catch (err: any) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      await contactApi.delete(id);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err: any) {
      console.error('Failed to delete contact:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'read':
        return 'bg-yellow-500';
      case 'replied':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading contacts...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="text-muted-foreground mt-1">
          Manage and respond to contact form submissions
        </p>
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>
                  {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4" />
                    {contact.email}
                  </a>
                </TableCell>
                <TableCell>{contact.company || '-'}</TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate">{contact.message}</p>
                </TableCell>
                <TableCell>
                  <Select
                    value={contact.status}
                    onValueChange={(value: 'new' | 'read' | 'replied') => 
                      handleStatusChange(contact._id, value)
                    }
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactsDashboard; 