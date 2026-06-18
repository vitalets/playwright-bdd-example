import type { User } from './User';

interface UserInfoProps {
  user: User;
  onBack: () => void;
}

export default function UserInfo({ user, onBack }: UserInfoProps) {
  return (
    <main>
      <h1>{user.name}</h1>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>{user.website}</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>{user.company.name}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {user.address.street}, {user.address.city}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="back-button" onClick={onBack}>
        &larr; Back
      </button>
    </main>
  );
}
