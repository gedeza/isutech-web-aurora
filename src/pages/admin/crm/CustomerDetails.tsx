import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  lastContact: string;
  notes: string[];
}

interface Interaction {
  id: string;
  date: string;
  type: string;
  description: string;
}

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // TODO: Fetch customer data from API
    // For now, using mock data
    const mockCustomer: Customer = {
      id: id || '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      company: 'Acme Corp',
      status: 'Active',
      lastContact: '2024-02-20',
      notes: ['Initial contact made', 'Interested in AI solutions'],
    };

    const mockInteractions: Interaction[] = [
      {
        id: '1',
        date: '2024-02-20',
        type: 'Email',
        description: 'Discussed AI implementation requirements',
      },
      {
        id: '2',
        date: '2024-02-19',
        type: 'Call',
        description: 'Initial consultation call',
      },
    ];

    setCustomer(mockCustomer);
    setInteractions(mockInteractions);
  }, [id, navigate]);

  const handleAddNote = () => {
    if (!newNote.trim() || !customer) return;

    // TODO: API call to add note
    setCustomer({
      ...customer,
      notes: [...customer.notes, newNote],
    });
    setNewNote('');
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <button
              onClick={() => navigate('/admin/crm')}
              className="text-primary hover:text-primary/90 mb-4"
            >
              ← Back to CRM
            </button>
            <h1 className="text-3xl font-bold">{customer.name}</h1>
            <p className="text-muted-foreground">{customer.email}</p>
          </div>
          <div>
            <button
              onClick={() => navigate(`/admin/crm/customers/${id}/edit`)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Edit Customer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{customer.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{customer.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{customer.company || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Contact</p>
                  <p className="font-medium">{customer.lastContact}</p>
                </div>
              </div>
            </div>

            {/* Interactions */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Interactions</h2>
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className="border-b border-border pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{interaction.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {interaction.description}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {interaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Notes</h2>
              <div className="space-y-4 mb-4">
                {customer.notes.map((note, index) => (
                  <div key={index} className="bg-background p-3 rounded-md">
                    <p className="text-sm">{note}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-md"
                  rows={3}
                />
                <button
                  onClick={handleAddNote}
                  className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails; 