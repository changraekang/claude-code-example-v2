// AddUserForm.jsx - Form with WRONG API parameters
import { useState } from 'react';

export default function AddUserForm({ onUserAdded }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('internal'); // Problem: Should be 0 or 1!
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // PROBLEM: Backend expects user_type as 0 or 1
      // But we're sending "internal" or "external"!
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          user_type: userType // WRONG: Should be 0 or 1
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create user');
      }

      // Reset form
      setUsername('');
      setEmail('');
      setUserType('internal');

      // Notify parent
      if (onUserAdded) {
        onUserAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '30px',
      background: 'white'
    }}>
      <h2>Add New User</h2>

      {error && (
        <div style={{
          padding: '10px',
          background: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #ef5350'
        }}>
          ❌ Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            User Type:
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="internal">Internal (Regular User)</option>
            <option value="external">External User</option>
          </select>
          <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
            ⚠️ Note: The form sends "internal" or "external" but backend might expect something else!
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: loading ? '#ccc' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
}
