import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_DISCUSSION } from "../utils/queries.js";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "../utils/mutations.js";
import Auth from "../utils/auth.js"
import './css/Discussion.css'

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
        setNewComment('')

    }

    if (loading) {return <p>Loading...</p>}
    return (
        <div className="discussion-page">
          <div className="container py-4">
            <div className="row align-items-center">
              {/* Book Image Section */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="bookData">
                  <img
                    src={data?.getDiscussion?.image}
                    alt={`Cover for ${data?.getDiscussion?.title}`}
                    className="book-image"
                  />
                </div>
              </div>
      
              {/* Book Details Section */}
              <div id="discussion-Border" className="col-lg-6 col-md-6 col-sm-12">
                <h2 className="discussion-title">{data?.getDiscussion?.title}</h2>
                <h3 style={{ fontFamily: "Open Sauce Sans" }} className="disc-author">
                  By: {data?.getDiscussion?.authors?.join(", ")}
                </h3>
              </div>
            </div>
      
            {/* Comments Section */}
            <div style={{marginTop:'10%'}} className="row mt-4">

  {/* Add Comment Form */}
  <div className="col-lg-6 col-md-6 col-sm-12">
    <div>
     
      <form className="commentForm" onSubmit={handleSubmit}><span style={{
          fontFamily: "Open Sauce Sans",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>Join The Discussion!</span>
        <textarea
          className="commentText"
          name="Comment"
          value={newComment || ""}
          onChange={handleChange}
        />
        <button className="comment-btn" type="submit">Add comment</button>
      </form>
    </div>
  </div>
   {/* Comments List */}
   <div className="col-lg-6 col-md-6 col-sm-12">
    <ul className="comment-section">
      {data?.getDiscussion?.comments?.map((comment: any) => (
        <li key={comment.commentId} className="commentItem">
        <span className="commentUser">{comment.username}</span> : 
        <span className="commentContent"> {comment.content}</span>
      </li>
      ))}
    </ul>
  </div>
</div>

          </div>
        </div>
      );
    }      

export default DiscussionPage