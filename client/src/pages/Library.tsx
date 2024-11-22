import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
// import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import './css/Library.css';
// import LibraryPic from '../assets/bookshelfpic2.png';
// import { CiCircleMinus } from "react-icons/ci";
import { FaTrashCan } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";




const LibraryPage: React.FC = () => {

  
    // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
    const { data, refetch } = useQuery(GET_ME);
    const [removeBook] = useMutation(REMOVE_BOOK);

  
    const user = data?.me;

      // State to track the book count
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    if (user?.books) {
      setBookCount(user.books.length);
    }
  }, [user?.books]);

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
      <div className="library-page">
        <div className="library-container ">
          <div className="row">
            {/* Left Column */}
            <div  style={{backgroundColor:'#faefe0'}} className="col-12 col-lg-3 dynamic-height">
              <div className="welcome-section text-center">
                <h2 className="mb-4" style={{ fontFamily: 'Open Sauce Sans', fontSize: '24px', marginTop:'15%' }}>
                  Welcome to Your Library, {user?.username?.split(' ')[0]}
                </h2>
                <p className="book-count">
                  Books in Your Library: <strong>{bookCount}</strong>
                </p>
              </div>
            </div>
  {/* Right Column */}
<div style={{padding:'2%', position:'relative'}} className="col-12 col-lg-9">
  <div className='add-book-btn-container'>
  <div className='add-book-btn'><Link to={"/bookSearch"}><GoPlusCircle /> Add a Book</Link></div>
    </div>

  <div style={{ marginTop: '5%' }} className="book-list d-flex flex-column">
    {user?.books && user.books.length > 0 ? (
      user.books.map(
        (
          book: {
            _id: string;
            title: string;
            authors: string[];
            progress?: number;
            image: string;
          },
          index: number
        ) => (
          <div
            className="book-row d-flex align-items-start mb-4"
            key={book._id}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff',
              marginLeft:'5%'
            }}
          >
            {/* Book Number */}
            <div
              className="book-number me-3"
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                width: '40px',
                textAlign: 'center',
              }}
            >
              {index + 1}
            </div>

            {/* Book Image */}
            <img
              src={book.image}
              alt={`Cover for ${book.title}`}
              className="book-image me-3"
              style={{
                width: '100px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />

            {/* Book Details */}
            <div
              className="book-details d-flex flex-column "
              style={{ lineHeight: '1.4' }}
            >
              <Link to={`/book/${book._id}`}>
                <h5
                  style={{
                    fontSize: '18px',
                    color: 'black',
                    textDecoration: 'none',
                    marginBottom: '5px',
                  }}
                >
                  {book.title}
                </h5>
              </Link>
              <p
                style={{
                  fontSize: '14px',
                  color: '#555',
                  margin: '0',
                  display: 'flex',
                }}
              >
                {book.authors.join(', ') || 'Unknown'}
              </p>
              <div style={{cursor:'pointer'}}
          
          onClick={() => handleRemoveBook(book._id)}
          
        > <FaTrashCan />

        </div>
            </div>
          </div>
        )
      )
    ) : (
      <p>No books found. Add some books to your library!</p>
    )}
  </div>
</div>

          </div>
        </div>
      </div>
    );
  };
  
    
      export default LibraryPage;