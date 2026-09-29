import { useState, useEffect, useContext } from 'react';
import { Search, MapPin, Calendar, Plus, Loader2, AlertCircle, X, CheckCircle, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const LostFound = () => {
  const { token } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Lost',
    itemName: '',
    category: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    phone: '',
    rollNo: ''
  });

  const fetchLostFound = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lostfound`);
      if (!response.ok) {
        throw new Error('Failed to fetch lost and found items');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message || 'An error occurred fetching items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostFound();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to report an item.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lostfound`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to report item');
      }

      setIsModalOpen(false);
      setFormData({
        type: 'Lost', itemName: '', category: '', description: '', 
        location: '', date: new Date().toISOString().split('T')[0], phone: '', rollNo: ''
      });
      fetchLostFound();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaim = async (id) => {
    if (!token) {
      alert("You must be logged in to claim an item.");
      return;
    }

    if (!window.confirm("Are you sure you want to claim this item? Your contact info will be shared.")) {
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lostfound/${id}/claim`, {
        method: 'PUT',
        headers: {
          'x-auth-token': token
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to claim item');
      }

      fetchLostFound();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <header className="page-header">
        <div>
          <h1 className="page-title">Lost & Found</h1>
          <p>Report lost items or help return found ones.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Report Item
        </button>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="input-field" placeholder="Search for items..." style={{ width: '100%', paddingLeft: '2.5rem' }} />
          </div>
        </div>
      </div>

      <div className="grid-cards" style={{ minHeight: '300px' }}>
        {loading && (
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
            <Loader2 className="animate-spin" size={32} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
            <p>Loading items...</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)', padding: '3rem' }}>
            <AlertCircle size={32} style={{ marginBottom: '1rem' }} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No lost & found items reported yet.
          </div>
        )}

        {!loading && !error && items.map(item => {
          const isClaimed = item.status === 'Claimed';
          
          return (
            <div key={item._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: isClaimed ? 0.7 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className={`badge ${item.type === 'Lost' ? 'badge-danger' : 'badge-success'}`}>
                  {item.type}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.itemName} 
                  {isClaimed && <CheckCircle size={16} color="var(--success)" />}
                </h3>
                <span className="badge badge-primary" style={{ marginTop: '0.25rem', display: 'inline-block' }}>{item.category}</span>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{item.description}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> {item.location} ({item.date})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={16} /> Reported by: {item.ownerName} ({item.phone})
                </div>
              </div>

              {/* Claimer Information */}
              {isClaimed && item.claimedBy && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <p style={{ color: 'var(--success)', fontWeight: 'bold', marginBottom: '0.25rem' }}>Resolved by: {item.claimedBy.name}</p>
                  <p style={{ color: 'var(--text-secondary)' }}>Email: {item.claimedBy.email}</p>
                  {item.claimedBy.branch && <p style={{ color: 'var(--text-secondary)' }}>Branch: {item.claimedBy.branch}</p>}
                </div>
              )}

              {!isClaimed && (
                <button onClick={() => handleClaim(item._id)} className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                  {item.type === 'Lost' ? "I Found This" : "Claim Item"}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Report Item Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Report an Item</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleReport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Type</label>
                <select name="type" className="input-field" value={formData.type} onChange={handleChange} required>
                  <option value="Lost">I Lost Something</option>
                  <option value="Found">I Found Something</option>
                </select>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Item Name</label>
                <input type="text" name="itemName" className="input-field" value={formData.itemName} onChange={handleChange} required placeholder="e.g. Blue Hydro Flask" />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Category</label>
                <input type="text" name="category" className="input-field" value={formData.category} onChange={handleChange} required placeholder="e.g. Electronics, Accessories" />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Description</label>
                <textarea name="description" className="input-field" value={formData.description} onChange={handleChange} required placeholder="Describe the item..." style={{ minHeight: '80px', resize: 'vertical' }}></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Location</label>
                  <input type="text" name="location" className="input-field" value={formData.location} onChange={handleChange} required placeholder="Where was it?" />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Date</label>
                  <input type="date" name="date" className="input-field" value={formData.date} onChange={handleChange} required />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Your Phone Number</label>
                <input type="tel" name="phone" className="input-field" value={formData.phone} onChange={handleChange} required placeholder="To contact you" />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={submitting}>
                {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Submit Report'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFound;
