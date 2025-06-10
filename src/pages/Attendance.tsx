
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  QrCode, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Attendance = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [attendanceMethod, setAttendanceMethod] = useState<'qr' | 'manual'>('qr');

  const activeEvents = [
    {
      id: 1,
      title: 'Financial Management Basics',
      date: '2024-01-15',
      time: '14:00',
      venue: 'Conference Room A',
      capacity: 30,
      registered: 24,
      status: 'ongoing'
    }
  ];

  const upcomingEvents = [
    {
      id: 2,
      title: 'Digital Marketing for Coops',
      date: '2024-01-20',
      time: '10:00',
      venue: 'Training Center B',
      capacity: 25,
      registered: 18,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Risk Management Workshop',
      date: '2024-01-25',
      time: '09:00',
      venue: 'Main Auditorium',
      capacity: 40,
      registered: 32,
      status: 'upcoming'
    }
  ];

  const attendees = [
    {
      id: 1,
      name: 'Juan Miguel Santos',
      email: 'juan.santos@coop.com',
      cooperative: 'Metro Manila Cooperative',
      checkedIn: true,
      checkInTime: '13:55',
      method: 'QR Code'
    },
    {
      id: 2,
      name: 'Maria Elena Rodriguez',
      email: 'maria.rodriguez@coop.com',
      cooperative: 'Northern Luzon Cooperative',
      checkedIn: true,
      checkInTime: '14:02',
      method: 'Manual'
    },
    {
      id: 3,
      name: 'Roberto Cruz',
      email: 'roberto.cruz@coop.com',
      cooperative: 'Central Visayas Cooperative',
      checkedIn: false,
      checkInTime: null,
      method: null
    },
    {
      id: 4,
      name: 'Ana Cristina Dela Cruz',
      email: 'ana.delacruz@coop.com',
      cooperative: 'Mindanao Development Cooperative',
      checkedIn: true,
      checkInTime: '13:58',
      method: 'QR Code'
    }
  ];

  const generateQRCode = () => {
    toast({
      title: "QR Code Generated",
      description: "A unique QR code has been generated for this training event.",
    });
  };

  const markAttendance = (attendeeId: number, present: boolean) => {
    const attendee = attendees.find(a => a.id === attendeeId);
    toast({
      title: present ? "Marked Present" : "Marked Absent",
      description: `${attendee?.name} has been marked as ${present ? 'present' : 'absent'}.`,
    });
  };

  const selectedEventData = selectedEvent ? [...activeEvents, ...upcomingEvents].find(e => e.id === selectedEvent) : null;

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
              <h1 className="text-xl font-bold text-gray-900">Attendance Management</h1>
              <p className="text-sm text-gray-500">Track and manage training attendance</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedEvent ? (
          <>
            {/* Event Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Training Event</h2>
              
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active">Active Events</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {activeEvents.length > 0 ? (
                    activeEvents.map((event) => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedEvent(event.id)}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                              <Badge className="bg-green-100 text-green-800 mt-2">
                                <Clock className="h-3 w-3 mr-1" />
                                Currently Active
                              </Badge>
                            </div>
                            <Button>Select Event</Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {event.venue}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              {event.registered}/{event.capacity} registered
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Events</h3>
                        <p className="text-gray-600">There are no currently active training events.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedEvent(event.id)}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                            <Badge className="bg-blue-100 text-blue-800 mt-2">
                              Upcoming
                            </Badge>
                          </div>
                          <Button variant="outline">Prepare Attendance</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.venue}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {event.registered}/{event.capacity} registered
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          /* Attendance Management Interface */
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedEvent(null)}
                  className="mb-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Button>
                <h2 className="text-2xl font-bold text-gray-900">{selectedEventData?.title}</h2>
                <p className="text-gray-600">
                  {selectedEventData && new Date(selectedEventData.date).toLocaleDateString()} • {selectedEventData?.venue}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {attendees.filter(a => a.checkedIn).length}/{attendees.length}
                </div>
                <p className="text-sm text-gray-600">Attendees Present</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Attendance Method Selection */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Attendance Method</CardTitle>
                  <CardDescription>Choose how to track attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant={attendanceMethod === 'qr' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setAttendanceMethod('qr')}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code Scan
                    </Button>
                    <Button
                      variant={attendanceMethod === 'manual' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setAttendanceMethod('manual')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manual Check-in
                    </Button>
                  </div>

                  {attendanceMethod === 'qr' && (
                    <div className="mt-6 p-4 border rounded-lg text-center">
                      <div className="w-32 h-32 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-gray-400" />
                      </div>
                      <Button onClick={generateQRCode} className="w-full">
                        Generate QR Code
                      </Button>
                      <p className="text-xs text-gray-600 mt-2">
                        Officers can scan this code to mark attendance
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Attendee List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Registered Attendees</CardTitle>
                  <CardDescription>
                    {attendanceMethod === 'manual' ? 'Click to mark attendance manually' : 'Real-time attendance tracking'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{attendee.name}</h4>
                          <p className="text-sm text-gray-600">{attendee.cooperative}</p>
                          <p className="text-xs text-gray-500">{attendee.email}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {attendee.checkedIn ? (
                            <div className="text-right">
                              <div className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Present
                              </div>
                              <p className="text-xs text-gray-600">
                                {attendee.checkInTime} • {attendee.method}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-400">
                              <XCircle className="h-4 w-4 mr-1" />
                              Not checked in
                            </div>
                          )}
                          
                          {attendanceMethod === 'manual' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant={attendee.checkedIn ? "outline" : "default"}
                                onClick={() => markAttendance(attendee.id, true)}
                              >
                                Present
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAttendance(attendee.id, false)}
                              >
                                Absent
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Attendance;
