import { useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { GET_BOOK_REVIEWS } from "../utils/queries"
import './css/BookThoughts.css'
// import BookThoughtsPic from '../assets/linenpic2.png'


const BookThoughtsPage: React.FC = ()=>{

    const {bookId}=useParams()
    const {data, loading} = useQuery(GET_BOOK_REVIEWS, {variables: {bookId: bookId}})

    if (loading) {return <p>Loading...</p>}

    return (
        <div className="thoughts-page">
          {/* <img src={BookThoughtsPic} alt="book" className="review-background" /> */}

        <div className="content-container">

            {data && data?.bookReviews?.length > 0 ? (
                <div className="center">
                    <h2 style={{fontFamily:'Open Sauce Sans'}}>Here's what people thought</h2>
                    <div className="review-section">
                        <ul>
                            {data?.bookReviews.map((book: any) => (
                                <li style={{fontFamily:'Open Sauce Sans'}} key={book.review._id}>
                                    < span>{book.review.username}</span>: <span>{book.review.content}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <h2>No one's left any thoughts yet...</h2>
            )}
        </div>
        </div>
    );
}    


export default BookThoughtsPage