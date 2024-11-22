import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import './css/Library.css';
import LibraryPic from '../assets/linenpic2.png';
import { CiCircleMinus } from "react-icons/ci";


const LibraryPage: React.FC = () => {
    // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
    const { data, refetch } = useQuery(GET_ME);
    const [removeBook] = useMutation(REMOVE_BOOK);

  
    const user = data?.me;

    const handleRemoveBook = async (bookId: string) => {
      const confirmDelete = window.confirm("Are you sure you want to remove this book?");
      if (!confirmDelete) return;
  
      try {
        await removeBook({ variables: { bookId } });
        refetch(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error removing book:", error);
      }
    };

    return (
      <div className='library-page'>
        <img src={LibraryPic} alt="book" className="library-background" />
        <div className='library-container'>
        <div className="container mt-5">
          <h1 style={{fontFamily: 'Open Sauce Sans', fontSize:'50px', fontStyle:'strong'}} className="text-center mb-4">My Library</h1>
          <div className="row">
            {user?.books && user.books.length > 0 ? (
              user.books.map((book: { _id: string; title: string; authors: string[]; progress?: number, image: string }) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4" key={book._id}>
                  <div className="card h-100 shadow-sm">
                    {/* Book Cover Image */}
                    <Link to={`/book/${book._id}`}><img
                      src={book.image}
                      alt={`Cover for ${book.title}`}
                      className="card-img-top"
                      style={{
                        height: '200px',
                        objectFit: 'contain',
                        width: '100%',
                      }}
                    /></Link>
    
                    {/* Content Below the Image */}
                    <div className="card-body d-flex flex-column justify-content text-center">
                    <Link to={`/book/${book._id}`}><h5 style={{ fontSize: '13px', color:'black', textDecoration:'none'}} className="card-title">{book.title}</h5></Link>
                      <p style={{ fontSize: '13px' }} className="card-text">
                        {book.authors.join(', ') || 'Unknown'}
                      </p>
                      <p className="card-text">
                        <strong>Progress:</strong> {book.progress || 0}%
                      </p>
                    </div>
                    <div
                        
                        onClick={() => handleRemoveBook(book._id)}
                      >
                        Remove Book <CiCircleMinus className='icon-style' />
                      </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No books found. Add some books to your library 
                  <span>
                    <Link to="/bookSearch">
                      <CiCirclePlus style={{fontWeight:'strong'}} className='icon-style' />
                    </Link>
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    );
  };
    
      export default LibraryPage;