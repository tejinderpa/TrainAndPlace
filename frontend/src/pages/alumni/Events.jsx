import { useState, useEffect } from 'react';
import { LuCalendar, LuMapPin, LuClock, LuUsers, LuSearch } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState } from '@/components/common';
import toast from 'react-hot-toast';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockEvents = [
        {
          _id: '1',
          title: 'Career Guidance Workshop',
          description: 'Learn about industry trends and career paths from experienced alumni',
          date: '2025-12-28',
          time: '3:00 PM',
          location: 'Auditorium Hall',
          type: 'workshop',
          attendees: 45,
          maxAttendees: 100
        },
        {
          _id: '2',
          title: 'Tech Talk: AI & Machine Learning',
          description: 'Deep dive into latest AI technologies and their applications',
          date: '2025-12-30',
          time: '5:00 PM',
          location: 'Virtual - Zoom',
          type: 'seminar',
          attendees: 78,
          maxAttendees: 150
        },
        {
          _id: '3',
          title: 'Alumni Networking Mixer',
          description: 'Connect with fellow alumni and current students over refreshments',
          date: '2026-01-05',
          time: '6:00 PM',
          location: 'Campus Cafeteria',
          type: 'networking',
          attendees: 32,
          maxAttendees: 80
        }
      ];
      setEvents(mockEvents);
    } catch (error) {
      toast.error('Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeBadge = (type) => {
    const variants = {
      workshop: 'info',
      seminar: 'warning',
      networking: 'success',
      placement: 'primary'
    };
    return <Badge variant={variants[type] || 'secondary'}>{type}</Badge>;
  };

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= new Date());
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < new Date());

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600 mt-2">Stay updated with campus events and networking opportunities</p>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </Card>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <EmptyState
            icon={LuCalendar}
            title="No upcoming events"
            description="Check back later for new events"
          />
        ) : (
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event._id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      {getEventTypeBadge(event.type)}
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <LuCalendar className="w-4 h-4 text-primary-600" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LuClock className="w-4 h-4 text-primary-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LuMapPin className="w-4 h-4 text-primary-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LuUsers className="w-4 h-4 text-primary-600" />
                        <span>{event.attendees}/{event.maxAttendees} Registered</span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <button className="btn-primary">
                      Register
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Events</h2>
          <div className="grid gap-4">
            {pastEvents.map((event) => (
              <Card key={event._id} className="opacity-75">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      {getEventTypeBadge(event.type)}
                      <Badge variant="secondary">Completed</Badge>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <LuCalendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LuUsers className="w-4 h-4" />
                        <span>{event.attendees} Attended</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
