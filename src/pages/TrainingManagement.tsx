
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Edit3,
  Trash2,
  Eye
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const TrainingManagement = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    capacity: '',
    speaker: '',
    category: ''
  });

  const trainings = [
    {
      id: 1,
      title: 'Financial Management Basics',
      description: 'Learn fundamental financial management principles for cooperatives',
      date: '2024-01-15',
      time: '14:00',
      venue: 'Conference Room A',
      capacity: 30,
      registered: 24,
      speaker: 'Dr. Maria Santos',
      category: 'Finance',
      status: 'ongoing'
    },
    {
      id: 2,
      title: 'Cooperative Governance',
      description: 'Understanding governance structures and best practices',
      date: '2024-01-12',
      time: '09:00',
      venue: 'Main Auditorium',
      capacity: 50,
      registered: 45,
      speaker: 'Prof. Juan dela Cruz',
      category: 'Governance',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Digital Marketing for Coops',
      description: 'Modern marketing strategies for cooperative businesses',
      date: '2024-01-20',
      time: '10:00',
      venue: 'Training Center B',
      capacity: 25,
      registered: 18,
      speaker: 'Ms. Anna Rodriguez',
      category: 'Marketing',
      status: 'upcoming'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.date || !formData.venue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Training Event Created",
      description: `"${formData.title}" has been successfully created and officers will be notified.`,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      capacity: '',
      speaker: '',
      category: ''
    });
    setIsCreating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Training & Seminar Management</h1>
              <p className="text-sm text-gray-500">Create and manage training events</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isCreating ? (
          <>
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Training Events</h2>
                <p className="text-gray-600">Manage your cooperative training programs</p>
              </div>
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Training
              </Button>
            </div>

            {/* Training Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {trainings.map((training) => (
                <Card key={training.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className={getStatusColor(training.status)}>
                        {training.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{training.category}</span>
                    </div>
                    <CardTitle className="text-lg">{training.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {training.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(training.date).toLocaleDateString()} at {training.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {training.venue}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {training.registered}/{training.capacity} registered
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Speaker: {training.speaker}
                      </div>
                    </div>

                    <div className="flex justify-between mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Create Training Form */
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Create New Training Event</CardTitle>
              <CardDescription>
                Fill in the details below to create a new training session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Training Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Financial Management Basics"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="e.g., Finance, Governance"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the training content and objectives"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData({...formData, venue: e.target.value})}
                      placeholder="e.g., Conference Room A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      placeholder="Maximum participants"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speaker">Speaker/Facilitator</Label>
                  <Input
                    id="speaker"
                    value={formData.speaker}
                    onChange={(e) => setFormData({...formData, speaker: e.target.value})}
                    placeholder="e.g., Dr. Maria Santos"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Training Event
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainingManagement;
