import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth.js'
import { Link } from 'react-router-dom';
import './css/Profile.css';
import placeholder from '../assets/placeholderpic.png'


const ProfilePage: React.FC = () => {
  // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  const user = data?.me;
  
  

  return (
    <div className="profile-page">
        <button className="logout-button" onClick={() => { Auth.logout() }}>Logout</button>

      <div className="profile-container">

      <div className="welcome-header">
          <img 
            src={placeholder} 
            alt="Welcome background" 
            className="background-img" 
          />
          <h1>Welcome, {user?.username}</h1>
        </div>

        <section className="container my-4">
  <div className="row">
    {/* Left Column */}
    <div className="col-lg-6">
      <div className="card h-100 shadow-sm custom-card">
        <div className="card-body">
          <h2 className="card-title">My Books</h2>
          <ul>
            {user?.books.map((book: { _id: string; title: string; authors: string[]; progress?: number, image: string }) => (
              <li key={book._id}>
                <p>{book.title} by {book.authors.join(', ') || "unknown"}</p>
                <img 
                  src={book.image} 
                  alt={`Cover for ${book.title}`} 
                  className="img-fluid mb-2"
                />
                <p>Progress: {book.progress || 0}%</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div >
    <span style={{marginRight:'2%', marginLeft:'3%'}}>For new books, search</span>
    <Link to="/bookSearch" className='btn here-button'>Here</Link>
  </div>
</div>

    {/* Right Column */}
    <div className="col-lg-6">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">My Clubs</h2>
          <ul>
            {user?.groups.map((group: { _id: string; description: string; groupname: string }) => (
              <li key={group._id}>
                <p>{group.groupname}</p>
                <p>{group.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div >
        <span style={{marginRight:'2%', marginLeft:'3%'}}>For new clubs, search</span>
        <Link to="/clubSearch" className='btn here-button'>Here</Link>
      </div>
    </div>
  </div>
</section>

      </div>
      </div>
    
  );
};

export default ProfilePage;

{/* <Link to="/createClub" className="btn btn-primary mt-3">Create new club</Link> */}
