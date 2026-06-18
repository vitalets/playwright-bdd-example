import { useEffect, useState } from 'react';
import type { User } from './User';
import UsersList from './UsersList';
import UserInfo from './UserInfo';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  if (selectedUser) {
    return <UserInfo user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return <UsersList users={users} error={error} onSelect={setSelectedUser} />;
}
