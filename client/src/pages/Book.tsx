import { useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BOOK } from "../utils/queries";
import { UPDATE_BOOK_PROGRESS, UPDATE_REVIEW } from "../utils/mutations";

const BookPage: React.FC = ()=>{

const {id} = useParams()
const {data, loading} = useQuery(GET_BOOK, {variables: {_id: id}})
const [updateProgress] = useMutation(UPDATE_BOOK_PROGRESS, {refetchQueries: [GET_BOOK]})
const [updateReview] = useMutation(UPDATE_REVIEW, { refetchQueries: [GET_BOOK]})
const [progressUpdate, setProgressUpdate] = useState(false)
const [newProgress, setNewProgress] = useState(0)
const [thoughtsUpdate, setThoughtsUpdate] = useState(false)
const [newThoughts, setNewThoughts] = useState(data.getBook.review.content || '')
const [shared, setShared] = useState('')

if (loading) {return <p>Loading...</p>}

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

const handleSharedChange = (event: ChangeEvent<HTMLInputElement>)=> {
    const {value} = event.target
    if (value == 'shared') {setShared('')}
    else {setShared('shared')}
}

const ProgressSubmit = async (event: FormEvent)=> {
    event.preventDefault()
    if (!isNaN(Number(newProgress))) {
        await updateProgress({variables: {progress: Number(newProgress), bookId: id}})
    }
    setProgressUpdate(false)
}

const ThoughtsSubmit = async (event: FormEvent)=> {
    event.preventDefault()
    const sharedBoolean = (!!shared)
    if (newThoughts != '') {
        await updateReview({variables: {shared: sharedBoolean, content: newThoughts, _id: id}})
    }
    setThoughtsUpdate(false)
}

return (
    <>
        <div className='bookData'>
            <img src={data.getBook.image} alt={`Cover for ${data.getBook.title}`}/>
            <h2>{data.getBook.title}</h2>
            <h3>By: {data.getBook.authors.join(", ")}</h3>
        </div>
        {!progressUpdate? (
            <div>
                <p>Current Progress: {data.getBook.progress || 0}%</p>
                <button onClick={switchProgress}>Update Progress?</button>
            </div>) : 
            (<div>
                <form className="progressForm" onSubmit={ProgressSubmit}>
                    <input onChange={handleProgressChange} name="progress" type='text' value={newProgress}/>
                    <button type="submit">Update my progress</button>
                </form>
            </div>)}
        <div>
        {data.getBook.review.shared? (<h3>My thoughts (shared)</h3>) : (<h3>My thoughts (private)</h3>)}
        {!thoughtsUpdate? (
            <div>
                <p>{data.getBook.review.content || 'Nothing yet...'}</p>
                <button onClick={switchThoughts}>Update thoughts?</button>
            </div>) : (
            <div>
                <form className="thoughtsForm" onSubmit={ThoughtsSubmit}>
                    <textarea value={newThoughts} name="thoughts" onChange={handleThoughtsChange}/>
                    <input type="checkbox" checked={false} value={shared} name="shared" onChange={handleSharedChange}>Share thoughts?</input>
                    <button type="submit">Update my thoughts</button>
                </form>
            </div>    
        )}
        </div>
    </>
)

}


export default BookPage