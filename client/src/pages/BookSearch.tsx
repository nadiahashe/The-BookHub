import React, { ChangeEvent, FormEvent, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_ME } from "../utils/queries"
import { GOOGLE_BOOK_SEARCH, ADD_BOOK } from "../utils/mutations"
import { useNavigate } from "react-router-dom"

const BookSearchPage: React.FC = ()=> {

    const user = useQuery(GET_ME)
    const [bookSearch, {data}] = useMutation(GOOGLE_BOOK_SEARCH)
    const [searchString, setSearchString]= useState('')
    const [addBook, newbook] = useMutation(ADD_BOOK, {refetchQueries: [GET_ME]})
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
        navigate(`/book/${newbook.data.addBook._id}`)
    }


    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" onChange={handleChange} value={searchString}></input>
                <button type="submit"></button>
            </form>
            <section>
                {data?.bookSearch && data?.bookSearch.length<1? (<p>No results found</p>):(
                    <ul>
                        {data?.bookSearch.map((book:any)=>(
                            <li key={book.bookId}>
                                <p>{book.title} by {book.authors.join(', ') || "unknown"}</p>
                                <img src={book.image} alt={`Cover for ${book.title}`}/>
                                {!user.data.me.books.map((book:any)=>(book.bookId)).includes(book.bookId)? (
                                    <button onClick={()=>{handleAdd(book.title, book.authors, book.image, book.bookId)}}>Add to collection</button>
                                ):(
                                    <button disabled>Already in collection</button>
                                )

                                }
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}


export default BookSearchPage