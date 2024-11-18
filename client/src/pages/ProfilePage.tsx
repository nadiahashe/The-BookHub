import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth.js'

const ProfilePage: React.FC = () => {
  // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  const user = data?.me;

  return (
    <div className="profile-page">
      <h1>Welcome, {user?.username}</h1>
      
      <section>
        <h2>My Books</h2>
        <ul>
          {user?.books.map((book: { _id: string; title: string; authors: string[]; progress?: number }) => (
            <li key={book._id}>
              <p>{book.title} by {book.authors.join(', ')}</p>
              <p>Progress: {book.progress || 0}%</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>My Clubs</h2>
        <ul>
          {user?.groups.map((group: {_id: string, description: string, groupname: string}) => (
            <li key={group._id}>
              <p>{group.groupname}</p>
              <p>{group.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <button onClick={()=>{Auth.logout()}}>Logout</button>
    </div>
  );
};

export default ProfilePage;