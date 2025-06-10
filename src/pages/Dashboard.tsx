
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  LogOut,
  Settings,
  FileText,
  QrCode
} from 'lucide-react';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    
    if (!role) {
      navigate('/login');
      return;
    }
    
    setUserRole(role);
    setUserName(name || 'User');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const stats = [
    {
      title: 'Active Training Events',
      value: '12',
      description: 'Currently running',
      icon: Calendar,
      color: 'bg-blue-500',
      trend: '+2 this week'
    },
    {
      title: 'Registered Officers',
      value: '284',
      description: 'Total participants',
      icon: Users,
      color: 'bg-green-500',
      trend: '+18 this month'
    },
    {
      title: 'Compliance Rate',
      value: '87%',
      description: 'Overall compliance',
      icon: CheckCircle,
      color: 'bg-emerald-500',
      trend: '+5% improvement'
    },
    {
      title: 'Pending Reviews',
      value: '23',
      description: 'Require attention',
      icon: AlertCircle,
      color: 'bg-orange-500',
      trend: '-3 since yesterday'
    }
  ];

  const quickActions = [
    {
      title: 'Create Training Event',
      description: 'Set up new training sessions',
      icon: GraduationCap,
      action: () => navigate('/training-management'),
      color: 'bg-blue-600'
    },
    {
      title: 'Track Compliance',
      description: 'Monitor officer compliance',
      icon: FileText,
      action: () => navigate('/compliance-tracker'),
      color: 'bg-green-600'
    },
    {
      title: 'Manage Attendance',
      description: 'Record and track attendance',
      icon: QrCode,
      action: () => navigate('/attendance'),
      color: 'bg-purple-600'
    },
    {
      title: 'Generate Reports',
      description: 'View analytics and reports',
      icon: TrendingUp,
      action: () => navigate('/reports'),
      color: 'bg-indigo-600'
    }
  ];

  if (!userRole) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CoopWise</h1>
                <p className="text-sm text-gray-500 capitalize">{userRole} Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {userName}</span>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Good {new Date().getHours() < 12 ? 'Morning' : 'Afternoon'}, {userName}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your cooperative training management today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 mb-2">{stat.description}</p>
                <p className="text-xs text-green-600 font-medium">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        {userRole === 'administrator' && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-full ${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity & Compliance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Training Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Training Events</CardTitle>
              <CardDescription>Latest training sessions and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Financial Management Basics', date: 'Today, 2:00 PM', status: 'ongoing', participants: 24 },
                  { name: 'Cooperative Governance', date: 'Yesterday', status: 'completed', participants: 18 },
                  { name: 'Digital Marketing for Coops', date: 'Dec 6', status: 'upcoming', participants: 32 },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">{event.name}</h5>
                      <p className="text-sm text-gray-600">{event.date} • {event.participants} participants</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
              <CardDescription>Officer compliance status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fully Compliant</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Partially Compliant</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="h-2 bg-yellow-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Non-Compliant</span>
                    <span>3%</span>
                  </div>
                  <Progress value={3} className="h-2 bg-red-100" />
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/compliance-tracker')}
                >
                  View Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
