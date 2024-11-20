import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_DISCUSSION } from "../utils/queries.js";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "../utils/mutations.js";
import Auth from "../utils/auth.js"

const DiscussionPage: React.FC = ()=> {

    const {id} = useParams()
    const {data, loading} = useQuery(GET_DISCUSSION, { variables: {discussionId: id}})
    const [createComment] = useMutation(CREATE_COMMENT, { refetchQueries: [GET_DISCUSSION]})
    
    const [newComment, setNewComment] = useState("")

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>)=>{
        const {value} = event.target
        setNewComment(value)

    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (newComment != '' && Auth.loggedIn()) {
            await createComment({variables: {discussionId: id, content: newComment, username: Auth.getProfile().username}})
        }

    }

    if (loading) {return <p>Loading...</p>}

    return (
    <>
        <div className='bookData'>
            <img src={data?.getDiscussion.image} alt={`Cover for ${data?.getDiscussion.title}`}/>
            <h2>{data?.getDiscussion.title}</h2>
            <h3>By: {data?.getDiscussion?.authors?.join(", ")}</h3>
        </div>
        <ul className="commentsContainer">
            {data?.getDiscussion?.comments?.map((comment: any)=>(
            <li key={comment.commentId}>
                <p className="commentUser">{comment.username}</p>
                <p className="commentContent">{comment.content}</p>
            </li>            
            ))}
        </ul>
        <form className="commentForm" onSubmit={handleSubmit}>
            <textarea className="commentText" name="Comment" value={newComment || ''} onChange={handleChange}/>
            <button type="submit">Add comment</button>
        </form>
    </>
    )

}


export default DiscussionPage