import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_CLUB, GET_ME } from "../utils/queries"
import { CREATE_DISCUSSION } from "../utils/mutations"

const CreateDiscussionPage: React.FC = ()=>{

    const navigate = useNavigate()
    const {id} = useParams()
    const user = useQuery(GET_ME)
    const club = useQuery(GET_CLUB, {variables: {clubId:id}})
    const [createDiscussion] = useMutation(CREATE_DISCUSSION, { onCompleted: (newDiscussion)=>{navigate(`/discussion/${newDiscussion.createDiscussion._id}`)}})

    const handleSubmit = async (title: string, authors: string[], image: string, bookId: string) =>{
        await createDiscussion({variables: {title, authors, image, bookId, groupId:id}})
    }
     
    console.log(club)


    if (user.loading || club.loading) {return <p>Loading...</p>}

    return (
        <section>
            <h2>Pick a book from your collection to discuss</h2>
            <ul>
              {user.data?.me?.books.map((book: { _id: string; title: string; authors: string[], image: string, bookId: string}) => (
                <li key={book._id}>
                  <p>{book.title} by {book.authors.join(', ') || "unknown"}</p>
                  <img src={book.image} alt={`Cover for ${book.title}`}/>
                  {club.data?.getClub?.discussions.map((discussion: any)=>(discussion.bookId)).includes(book.bookId)? (
                    <button disabled>Already discussed!</button>
                      ): (
                    <button onClick={()=>{handleSubmit(book.title, book.authors, book.image, book.bookId)}} >
                        Discuss this book
                    </button>
                      )}
                </li>
              ))}
            </ul>
        </section>
    )
}

export default CreateDiscussionPage