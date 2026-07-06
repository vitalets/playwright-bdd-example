import { useState } from 'react';
import type { User } from './User';

interface UsersListProps {
  users: User[];
  error: string | null;
  onSelect: (user: User) => void;
}

const PAGE_SIZE = 5;

export default function UsersList({ users, error, onSelect }: UsersListProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(users.length / PAGE_SIZE);
  const firstUserIndex = page * PAGE_SIZE;
  const visibleUsers = users.slice(firstUserIndex, firstUserIndex + PAGE_SIZE);
  const isFirstPage = page === 0;
  const isLastPage = page >= pageCount - 1;

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
          {visibleUsers.map((user) => (
            <tr key={user.id} data-testid="user-row" onClick={() => onSelect(user)}>
              <td>#{user.id}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" disabled={isFirstPage} onClick={() => setPage((page) => page - 1)}>
          Previous page
        </button>
        <button type="button" disabled={isLastPage} onClick={() => setPage((page) => page + 1)}>
          Next page
        </button>
      </div>
    </main>
  );
}
