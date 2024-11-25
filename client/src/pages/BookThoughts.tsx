import { useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { GET_BOOK_REVIEWS } from "../utils/queries"
import './css/BookThoughts.css'
// import BookThoughtsPic from '../assets/linenpic2.png'


const BookThoughtsPage: React.FC = () => {

    const { bookId } = useParams()
    const { data, loading } = useQuery(GET_BOOK_REVIEWS, { variables: { bookId: bookId } })

    if (loading) { return <p>Loading...</p> }

    return (
        <div className="thoughts-page">
            {/* <img src={BookThoughtsPic} alt="book" className="review-background" /> */}

            <div className="content-container">
                {data && data?.bookReviews?.length > 0 ? (
                    <div className="discussion-page">
                        <div className="container py-4">
                            <div className="row align-items-center">
                                {/* Book Image Section */}
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="bookData">
                                        <img
                                            src={data?.bookReviews[0]?.image}
                                            alt={`Cover for ${data?.bookReviews[0]?.title}`}
                                            className="book-image"
                                        />
                                    </div>
                                </div>

                                {/* Book Details Section */}
                                <div id="discussion-Border" className="col-lg-6 col-md-6 col-sm-12">
                                    <h2 className="discussion-title">{data?.bookReviews[0]?.title}</h2>
                                    <h3 style={{ fontFamily: "Open Sauce Sans" }} className="disc-author">
                                        By: {data?.bookReviews[0]?.authors?.join(", ")}
                                    </h3>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div style={{ marginTop: '10%' }} className="row mt-4">

                                {/* Comments List */}
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <h2>Here's what people thought</h2>
                                    <ul className="comment-section">
                                        {data?.bookReviews.map((book: any) => (
                                            <li style={{ fontFamily: 'Open Sauce Sans' }} className="commentItem" key={book.review._id}>
                                                < span className="commentUser">{book.review.username}</span>: 
                                                <span className="commentContent">{book.review.content}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>) : (<div className="col-lg-6 col-md-6 col-sm-12">
                        <h2>No one's left any thoughts yet...</h2></div>)}
            </div>
        </div>
    );

}


export default BookThoughtsPage