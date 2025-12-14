// ExternalUserCard.jsx - Duplicate component for external users
// Problem: This is basically the same as UserCard with different styling
export default function ExternalUserCard({ user }) {
  return (
    <div style={{
      border: '1px solid #FF9800',
      borderRadius: '8px',
      padding: '16px',
      background: '#FFF3E0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0 }}>{user.username}</h3>
        <span style={{
          padding: '4px 8px',
          background: '#FF9800',
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          External User
        </span>
      </div>
      <p style={{ margin: '4px 0', color: '#666' }}>{user.email}</p>
      <p style={{ margin: '4px 0', fontSize: '12px', color: '#999' }}>
        ID: {user.id}
      </p>
    </div>
  );
}
