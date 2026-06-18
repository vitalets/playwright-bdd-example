import type { User } from './User';

interface UsersListProps {
  users: User[];
  error: string | null;
  onSelect: (user: User) => void;
}

export default function UsersList({ users, error, onSelect }: UsersListProps) {
  return (
    <main>
      <h1>Users</h1>
      {error && <p className="error">Failed to load users: {error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} data-testid="user-row" onClick={() => onSelect(user)}>
              <td>#{user.id}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
