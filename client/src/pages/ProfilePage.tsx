import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth.js'
import { Link } from 'react-router-dom';
import './css/Profile.css';
import placeholder from '../assets/placeholderpic.png'
import { CiCirclePlus } from "react-icons/ci";



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

        <section className="container">
  <div className="row">
    {/* Left Column */}
    <div className="col-lg-6 col-md-12">
      <div className="card h-100 shadow-sm custom-card w-100">
        <div className="card-body d-flex flex-column">
          <h2 className="card-title">My Books | <span style={{fontSize:'13px'}}>View all Books <Link to="/library">
                      <CiCirclePlus className='icon-styles' />
                    </Link></span></h2>
          <ul>
            {user?.books.slice(0,5).map((book: { _id: string; title: string; authors: string[]; progress?: number, image: string }) => (
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
          {/* <div className="mt-auto">
            <span style={{ marginRight: '2%', marginLeft: '3%' }}>For new books, search</span>
            <Link to="/bookSearch" className='btn here-button'>Here</Link>
          </div> */}
        </div>
      </div>
</div>

    {/* Right Column */}
    <div className="col-lg-6 col-md-12">
      <div className="card h-100 shadow-sm custom-card w-100">
        <div className="card-body d-flex flex-column">
          <h2 className="card-title">My Clubs</h2>
          <ul>
            {user?.groups.map((group: { _id: string; description: string; groupname: string }) => (
              <li key={group._id}>
                <p>{group.groupname}</p>
                <p>{group.description}</p>
              </li>
            ))}
          </ul>
          {/* <div className="mt-auto">
        <span style={{marginRight:'2%', marginLeft:'3%'}}>For new clubs, search</span>
        <Link to="/clubSearch" className='btn here-button'>Here</Link>
      </div> */}
        </div>
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
