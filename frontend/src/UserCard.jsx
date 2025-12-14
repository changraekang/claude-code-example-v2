// UserCard.jsx - Component for regular users
export default function UserCard({ user }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      background: '#f9f9f9'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0 }}>{user.username}</h3>
        <span style={{
          padding: '4px 8px',
          background: '#4CAF50',
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          Regular User
        </span>
      </div>
      <p style={{ margin: '4px 0', color: '#666' }}>{user.email}</p>
      <p style={{ margin: '4px 0', fontSize: '12px', color: '#999' }}>
        ID: {user.id}
      </p>
    </div>
  );
}
