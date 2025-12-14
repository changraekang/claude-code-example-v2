// App.jsx - Broken version with API parameter mismatch
import { useState, useEffect } from 'react';
import UserCard from './UserCard';
import ExternalUserCard from './ExternalUserCard';
import AddUserForm from './AddUserForm';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (err) {
      setError('Failed to fetch users: ' + err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = () => {
    fetchUsers(); // Refresh list
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>User Management System</h1>

      {error && (
        <div style={{ padding: '10px', background: '#ffcccc', borderRadius: '4px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <AddUserForm onUserAdded={handleUserAdded} />

      <h2>Users List ({users.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {users.map(user => {
          // Problem: Using different components for different user types
          if (user.user_type === 1) {
            return <ExternalUserCard key={user.id} user={user} />;
          } else {
            return <UserCard key={user.id} user={user} />;
          }
        })}
      </div>
    </div>
  );
}

export default App;
