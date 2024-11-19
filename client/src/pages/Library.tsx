import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import './css/Library.css';




const LibraryPage: React.FC = () => {
    // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
    const { data } = useQuery(GET_ME);
  
  
    const user = data?.me;

    
        return (
          <div className='library-page'>
          <div className="container mt-5">
            <h1 className="text-center mb-4">My Library</h1>
            <div className="row">
              {user?.books && user.books.length > 0 ? (
                user.books.map((book: { _id: string; title: string; authors: string[]; progress?: number, image: string }) => (
                  <div className="col-md-4 col-sm-6 mb-4" key={book._id}>
                    <div className="card shadow-sm h-100">
                      <img
                        src={book.image}
                        alt={`Cover for ${book.title}`}
                        className="card-img-top"
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text">
                          <strong>By:</strong> {book.authors.join(', ') || 'Unknown'}
                        </p>
                        <p className="card-text">
                          <strong>Progress:</strong> {book.progress || 0}%
                        </p>
                        <div className="mt-auto">
                          <a href={`/books/${book._id}`} className="btn btn-primary">
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                <p>No books found. Add some books to your library 
                  <span>
                    <Link to="/bookSearch">
                      <CiCirclePlus className='icon-style' />
                    </Link>
                  </span>
                </p>
              </div>
              )}
            </div>
          </div>
          </div>
        );
      };
      
      export default LibraryPage;