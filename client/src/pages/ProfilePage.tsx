import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
// import Auth from '../utils/auth.js'
import { Link } from 'react-router-dom';
import './css/Profile.css';
import placeholder from '../assets/placeholderpic.png'
import { CiCirclePlus } from "react-icons/ci";
import ProfilePicEditor from './ProfilePicEditor.js';
import { CiCamera } from "react-icons/ci";
import { Modal } from 'react-bootstrap';


const ProfilePage: React.FC = () => {
  // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
  const { data, loading, error } = useQuery(GET_ME);

  const [profilePic, setProfilePic] = useState<string>(placeholder); // Add state for profile picture
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  const user = data?.me;
  
  const handleSave = (newImage: string) => {
    setProfilePic(newImage); 
    setIsEditing(false); 
  };

  const handleCancel = () => {
    setIsEditing(false); 
  };



  return (
    <div className="profile-page">
      {/* <button className="logout-button" onClick={() => { Auth.logout() }}>Logout</button> */}

      <div className="profile-container">

        <div className="welcome-header">
          <img
            src={profilePic}
            alt="Profile"
            className="background-img"
          />
          <button
            className="edit-button"
            onClick={() => setIsEditing(true)} 
          >
            <CiCamera />
          </button>
          <h1>Welcome, {user?.username}</h1>
        </div>

        <Modal show={isEditing} onHide={handleCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Profile Picture Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProfilePicEditor
              onSave={handleSave}  
              onCancel={handleCancel} 
            />
          </Modal.Body>
        </Modal>


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
                <Link to={`/book/${book._id}`}><p>{book.title} by {book.authors.join(', ') || "unknown"}</p></Link>
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
                <Link to={`/club/${group._id}`}><p>{group.groupname}</p></Link>
                <p>{group.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
        <span >Add a club </span>
        <Link to="/createClub" className='btn here-button'>Here</Link>
      </div>
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

