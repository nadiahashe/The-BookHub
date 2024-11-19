import React, {ChangeEvent, FormEvent, useState} from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLUB } from '../utils/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ADD_USER_TO_GROUP } from '../utils/mutations';


const ClubPage: React.FC = () => {

  const {id}=useParams()
  const { data, loading, error } = useQuery(GET_CLUB, { variables: { clubId: id } });
  const navigate = useNavigate()
  const [newMemberSwitch, setNewMemberSwitch] = useState(false)
  const [newMember, setNewMember] = useState('')
  const [addUserToGroup, addUser]= useMutation(ADD_USER_TO_GROUP, {refetchQueries: [GET_CLUB]})

  

  const newDiscussionHandler = ()=> {
    navigate(`/createDiscussion/${id}`)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setNewMember(value)
  }

  const handleMemberSwitch = () => {
    setNewMemberSwitch(true)
  }

  const handleMemberSubmit = async (event: FormEvent)=> {
    event.preventDefault()
    if (!data?.getClub?.users.map((user: any)=>(user.username)).includes(newMember)) {
      await addUserToGroup({variables: { username: newMember, groupId: id}})
      setNewMemberSwitch(false)
    }
  }

  if (loading) {return <p>Loading...</p>}
  if (error) {return <p>Error loading club: {error.message}</p>};

  return (
    <div>
      <h1>{data?.getClub.groupname}</h1>
      <p>{data?.getClub.description}</p>
      <section>  
        <h3>Members</h3>
        <ul>
          {data?.getClub.users.map((user: any) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
        {!newMemberSwitch? (
          <button onClick={handleMemberSwitch}>Add new member</button>
          ) : (
          <form onSubmit={handleMemberSubmit}>
            <p>Enter username of new member</p>
            <input type='text' name="newMember" value={newMember} onChange={handleChange}/>
            <button type='submit'>Add member</button>
            {addUser.error? (<p>User not found</p>) : (<></>)}
          </form>
          )}
      </section>
      <section>
        <h3>Discussions</h3>
        <ul>
          {data?.getClub.discussions.map((discussion: any)=>(
            <li key={discussion._id}>
              <Link to={`/discussion/${discussion._id}`}>
                {discussion.title} by {discussion.authors.join(", ") || "unknown"}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={newDiscussionHandler}>Create new discussion</button>
      </section>
    </div>
  );
};

export default ClubPage;
