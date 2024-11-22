import { useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BOOK } from "../utils/queries";
import { UPDATE_BOOK_PROGRESS, UPDATE_REVIEW } from "../utils/mutations";
import './css/BookPage.css'
import { AiOutlineCloseSquare } from "react-icons/ai";


const BookPage: React.FC = ()=>{

    const {id} = useParams()
    const {data, loading, error} = useQuery(GET_BOOK, {variables: {getBookId: id}})

    const [updateProgress] = useMutation(UPDATE_BOOK_PROGRESS, {refetchQueries: [GET_BOOK]})

    const [updateReview] = useMutation(UPDATE_REVIEW, { refetchQueries: [GET_BOOK]})
    
    const [progressUpdate, setProgressUpdate] = useState(false)
    const [newProgress, setNewProgress] = useState(0)
    const [thoughtsUpdate, setThoughtsUpdate] = useState(false)
    const [newThoughts, setNewThoughts] = useState(data?.getBook?.review?.content)
    const [checked, setChecked] = useState(false)

    if (loading) {return <p>Loading...</p>}
    if (error) return <p>Error loading book: {error.message}</p>;

    const switchProgress = (event: FormEvent)=> {
        event.preventDefault()
        setProgressUpdate(true)
    }

    const switchThoughts = (event: FormEvent)=> {
        event.preventDefault()
        setThoughtsUpdate(true)
    }

    const handleProgressChange = (event: ChangeEvent<HTMLInputElement>)=> {
        const {value} = event.target
        if (!isNaN(Number(value))) {
            let numberValue = Number(value)
                if (numberValue < 0) {numberValue = 0}
                if (numberValue > 100) {numberValue = 100}
            setNewProgress(numberValue)
        }
    }

    const handleThoughtsChange = (event: ChangeEvent<HTMLTextAreaElement>)=> {
        const {value} = event.target
        setNewThoughts(value)
    }

    const handleSharedChange = ()=> {
        setChecked(!checked)
    }

    const cancelThoughtsUpdate = () => {
        setThoughtsUpdate(false);
        setNewThoughts(data?.getBook?.review?.content || ""); // Reset to original content
        setChecked(data?.getBook?.review?.shared || false);  // Reset checkbox state
      };

    const ProgressSubmit = async (event: FormEvent)=> {
        event.preventDefault()
        if (!isNaN(Number(newProgress))) {
            await updateProgress({variables: {progress: Number(newProgress), bookId: id}})
        }
        setProgressUpdate(false)
    }

    const ThoughtsSubmit = async (event: FormEvent)=> {
        event.preventDefault()
        if (newThoughts != '') {
            await updateReview({variables: {shared: checked, content: newThoughts, id: id}})
        }
        setThoughtsUpdate(false)
    }

    return (
        
          <div className="container py-4">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="bookData">
                  <img
                    src={data?.getBook?.image}
                    alt={`Cover for ${data?.getBook?.title}`}
                    className="book-image"
                  />
                </div>
              </div>
      
              {/* Right Column: Book Details */}
              <div id="title-border" className="col-lg-6 col-md-6 col-sm-12">
                <h2 className="book-title">{data?.getBook?.title}</h2>
                <h3 style={{fontFamily: 'Open Sauce Sans'}}className="book-author">By: {data?.getBook?.authors?.join(", ") || "Unknown"}</h3>
      
                {/* Progress Section */}
                <div className="progress-section mt-3">
                  {!progressUpdate ? (
                    <div className="d-flex flex-column ">
                      <p style={{justifyContent:'start', display:'flex',  fontSize: '13px',
    color: '#555'}}>Current Progress: {data?.getBook?.progress || 0}%</p>
                      <button id='btn' className="progress-btn" onClick={switchProgress}>
                        Update Progress?
                      </button>
                    </div>
                  ) : (
                    <form className="progressForm mt-3" onSubmit={ProgressSubmit}>
                      <input
                        className="form-control mb-2"
                        onChange={handleProgressChange}
                        name="progress"
                        type="number"
                        value={newProgress}
                      />
                      <button id="btn" type="submit">
                        Update my progress
                      </button>
                    </form>
                  )}
                </div>
              
              </div>
            </div>
      
            {/* Bottom Row: Thoughts Section */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="thoughts-section">
                  <h3 style={{fontFamily: 'Open Sauce Sans', display:'flex', justifyContent:'center'}}>
                    My Thoughts ({data?.getBook?.review?.shared ? "shared" : "private"})
                  </h3>
                  {!thoughtsUpdate ? (
                    <div className="d-flex flex-column align-items-center">
                      <p style={{fontFamily: 'Open Sauce Sans'}}>{data?.getBook?.review?.content || "Nothing yet..."}</p>
                      <button id='btn'  onClick={switchThoughts}>
                        Update thoughts?
                      </button>
                    </div>
                  ) : (
                    <form className="thoughtsForm mt-3" onSubmit={ThoughtsSubmit}>
                      <textarea
                        className="form-control mb-2"
                        value={newThoughts}
                        name="thoughts"
                        onChange={handleThoughtsChange}
                      />
                      <label className="form-label d-block">Make this thought shared?</label>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={checked}
                        name="shared"
                        onChange={handleSharedChange}
                      />
                    <div className="form-actions d-flex align-items-center">

                      <button id='btn' className="thoughts-btn" type="submit">
                        Update my thoughts
                      </button>
                      <AiOutlineCloseSquare
                    size={30}
                    className="ms-3 close-icon"
                    onClick={cancelThoughtsUpdate}
                    style={{ cursor: "pointer", color: "black" }}
                  />
                </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        
      );
    }      
    
export default BookPage