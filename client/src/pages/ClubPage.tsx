import React, {ChangeEvent, FormEvent, useState} from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLUB } from '../utils/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ADD_USER_TO_GROUP, REMOVE_USER_FROM_GROUP } from '../utils/mutations';
import './css/ClubPage.css';
import BookPic from '../assets/background-book.png'
import { Button, Card, Collapse } from 'react-bootstrap';
import Memberpic from '../assets/members.png'
import NewMember from '../assets/new-member.png'



const ClubPage: React.FC = () => {

  const [open, setOpen] = useState(false);


  const {id}=useParams()
  const { data, loading, error } = useQuery(GET_CLUB, { variables: { clubId: id } });
  const navigate = useNavigate()
  const [newMemberSwitch, setNewMemberSwitch] = useState(false)
  const [newMember, setNewMember] = useState('')
  const [addUserToGroup, addUser]= useMutation(ADD_USER_TO_GROUP, {refetchQueries: [GET_CLUB]})
  const [removeUserFromGroup, { loading: removing, error: removeError }] = useMutation(REMOVE_USER_FROM_GROUP, {
    refetchQueries: [GET_CLUB],
  })

  
  

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

  const handleLeaveClub = async () => {
    try {
        await removeUserFromGroup({
            variables: { groupId: id },
        });
        alert('You have successfully left the club!');
        navigate('/profile'); // Redirect to home after leaving
    } catch (err) {
        console.error(err);
        alert('Failed to leave the club. Please try again.');
    }
};

  if (loading) {return <p>Loading...</p>}
  if (error) {return <p>Error loading club: {error.message}</p>};


  return (
    <div className='club-page'>
      <img src={BookPic} alt="book" className="club-background" />
    <div className='club-container'>
      <h1 style={{fontFamily:'Open Sauce Sans', display:'flex', justifyContent:'center'}}>Welcome to your Club: {data?.getClub.groupname}</h1>
      <p>{data?.getClub.description}</p>
           <div>
          <div className="row">
            <div className="col-md-4">
              <Card>
                <Card.Img variant="top" src={Memberpic} alt={'members'} />
                <Card.Body>
                  {/* Button to toggle members */}
                  <Button onClick={() => setOpen(!open)} aria-expanded={open ? 'true' : 'false'} variant="primary">
                    {open ? 'Hide Members' : 'Show Members'}
                  </Button>

                  {/* Collapsible list of members */}
                  <Collapse in={open}>
                    <div>
                      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                        {data?.getClub.users.map((user: any) => (
                          <li key={user._id}>{user.username}</li> // Displaying member usernames
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </div>
          </div>
            
        
      </div>
      <div>
          <div className="row">
            <div className="col-md-4">
      <Card>
        <Card.Img variant='top' src={NewMember} alt={'new member'} />
          <Card.Body>
            {/* Button to toggle form visibility */}
            {!newMemberSwitch ? (
              <Button onClick={handleMemberSwitch}>Add new member</Button>
            ) : (
              <form onSubmit={handleMemberSubmit}>
                <p>Enter username of new member</p>
                <input 
                  type='text' 
                  name="newMember" 
                  value={newMember} 
                  onChange={handleChange} 
                  required 
                />
                <Button type='submit' variant="primary">Add member</Button>
                {addUser.error && <p style={{ color: 'red' }}>User not found</p>}
              </form>
            )}
          </Card.Body>
        </Card>
        </div>
        </div>
        
      <section>
        
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
      <button onClick={handleLeaveClub} disabled={removing}>
            {removing ? 'Leaving...' : 'Leave Club'}</button>
            {removeError && <p className="error-message">Error: {removeError.message}</p>}
    </div>
    </div>
    </div>
  );
};

export default ClubPage;
