import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Loader2, AlertCircle } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message || 'An error occurred fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Events</h1>
          <p>Discover and register for upcoming campus events.</p>
        </div>
      </header>

      <div className="grid-cards" style={{ minHeight: '300px' }}>
        {loading && (
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
            <Loader2 className="animate-spin" size={32} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
            <p>Loading events...</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)', padding: '3rem' }}>
            <AlertCircle size={32} style={{ marginBottom: '1rem' }} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No events available at this time.
          </div>
        )}

        {!loading && !error && events.map(event => {
          const bgStyle = event.society?.logoUrl 
            ? { backgroundImage: `url(${event.society.logoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: 'linear-gradient(45deg, #4318ff, #6ad2ff)' };
            
          return (
            <div key={event._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '140px', ...bgStyle }}></div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem' }}>{event.eventName}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{event.description}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} /> {event.registrationDeadline ? new Date(event.registrationDeadline).toLocaleDateString() : 'No Deadline'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} /> By {event.society?.name || 'Unknown'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={16} /> {event._count?.registrations || 0} Registrations
                  </div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  RSVP Now
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Events;
