import React, { ChangeEvent, FormEvent, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_ME } from "../utils/queries"
import { GOOGLE_BOOK_SEARCH, ADD_BOOK } from "../utils/mutations"
import { useNavigate, Link } from "react-router-dom"
import './css/BookSearch.css'
import BookSearchPic from '../assets/search2.png';


const BookSearchPage: React.FC = ()=> {

    const user = useQuery(GET_ME)
    const [bookSearch, {data}] = useMutation(GOOGLE_BOOK_SEARCH)
    const [searchString, setSearchString]= useState('')
    const [addBook] = useMutation(ADD_BOOK, {refetchQueries: [GET_ME], onCompleted: (newbook)=>{navigate(`/book/${newbook.addBook._id}`)}})
    const navigate = useNavigate()

    const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
        const {value} = event.target
        setSearchString(value)
    }

    const handleSearch = async (event: FormEvent)=>{
        event.preventDefault()
        await bookSearch({variables: {string: searchString}})
    }

    const handleAdd = async (title:string, authors:string[], image:string, bookId: string)=> {
        await addBook({variables:{title, authors, image, bookId}})
    }


    return (
        <div className="search-page">
            <img src={BookSearchPic} alt="book" className="search-background" />
            <div className="search-container">
            <div className="search-form">

            <form onSubmit={handleSearch}>
                <input style={{marginBottom:'10px'}} type="text" onChange={handleChange} value={searchString}></input>
                <button type="submit">Search for books</button>
            </form>
            <section>
                {data?.bookSearch && data?.bookSearch.length<1? (<p>No results found</p>):(
                    <ul style={{listStyleType:'none'}}>
                        {data?.bookSearch.map((book:any)=>(
                            <li key={book.bookId}>
                                <div className="row">
                                <div style={{marginTop:'10px'}} className="col-lg-6 col-md-6 col-sm-12">
                                 <img className="book-image" src={book.image} alt={`Cover for ${book.title}`}/>
                                </div>
                                <div style={{marginTop:'10px'}}className="col-lg-6 col-md-6 col-sm-12">

                                <p>{book.title} by {book.authors.join(', ') || "unknown"}</p>
                                {!user.data.me.books.map((book:any)=>(book.bookId)).includes(book.bookId)? (
                                    <button className="review-btn" onClick={()=>{handleAdd(book.title, book.authors, book.image, book.bookId)}}>Add to collection</button>
                                ):(
                                    <button className="review-btn" disabled>Already in collection</button>
                                )}
                                <button className="review-btn"><Link to={`/thoughts/${book.bookId}`}>See reviews</Link></button>
                            </div>
                            </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
        </div>
        </div>
    )
}


export default BookSearchPage