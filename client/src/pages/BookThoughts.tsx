import { useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { GET_BOOK_REVIEWS } from "../utils/queries"


const BookThoughtsPage: React.FC = ()=>{

    const {bookId}=useParams()
    const {data, loading} = useQuery(GET_BOOK_REVIEWS, {variables: {bookId: bookId}})

    if (loading) {return <p>Loading...</p>}

    return (
        <>
        {data && data?.bookReviews?.length>0? (
            <>
                <h2>Here's what people thought</h2>
                <ul>
                    {data?.bookReviews.map((book: any)=>(
                        <li key={book.review.reviewId}>
                            <p>{book.review.username}</p>
                            <p>{book.review.content}</p>
                        </li>

                    ))}
                </ul>
            </>
        ):(
            <h2>No one's left any thoughts yet...</h2>
        )}
        </>
    )
}


export default BookThoughtsPage