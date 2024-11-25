import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_CLUB } from '../utils/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './css/Library.css';
import { CREATE_DISCUSSION } from '../utils/mutations';




const CreateDiscussionPage: React.FC = () => {

  
    // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
    const {id} = useParams()
    const { data } = useQuery(GET_ME);
    const club = useQuery(GET_CLUB, {variables: {clubId:id}})
    const navigate = useNavigate()
    const [createDiscussion] = useMutation(CREATE_DISCUSSION, { onCompleted: (newDiscussion)=>{navigate(`/discussion/${newDiscussion.createDiscussion._id}`)}})
  
    const user = data?.me;

    const handleSubmit = async (title: string, authors: string[], image: string, bookId: string) =>{
      await createDiscussion({variables: {title, authors, image, bookId, groupId: id}})
    }

    return (
      <div className="library-page">
        <div className="library-container ">
          <div className="row">
            {/* Left Column */}
            <div  style={{backgroundColor:'#faefe0'}} className="col-12 col-lg-3 dynamic-height">
              <div className="welcome-section text-center">
                <h2 className="mb-4" style={{ fontFamily: 'Open Sauce Sans', fontSize: '24px', marginTop:'15%' }}>
                  Choose a book from your library to discuss
                </h2>
              </div>
            </div>
  {/* Right Column */}
<div style={{padding:'2%', position:'relative'}} className="col-12 col-lg-9">

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
            bookId: string;
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
              {!club?.data?.getClub?.discussions.map((discussion: any)=>(discussion.bookId)).includes(book.bookId)? (<Link to={``} onClick={()=>{handleSubmit(book.title, book.authors, book.image, book.bookId)}}>
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
              </Link>) : (<Link to={``}>
                <h5
                  style={{
                    fontSize: '18px',
                    color: 'black',
                    textDecoration: 'none',
                    marginBottom: '5px',
                  }}
                >
                  {`${book.title} (already discussed)`} 
                </h5>
              </Link>)}
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
            </div>
          </div>
        )
      )
    ) : (
      <p>No books found. Add some books to your library before you make a discussion!</p>
    )}
  </div>
</div>

          </div>
        </div>
      </div>
    );
  };
  
    
      export default CreateDiscussionPage;