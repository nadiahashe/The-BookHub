import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLUB } from '../utils/queries';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ClubPage: React.FC = () => {

  const {id}=useParams()
  const { data, loading } = useQuery(GET_CLUB, { variables: { clubId: id } });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.getClub.name}</h1>
      <p>{data.getClub.description}</p>
      <h3>Members</h3>
      <ul>
        {data.getClub.users.map((user: any) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
      <h3>Discussions</h3>
      <ul>
        {data.getClub.discussions.map((discussion: any)=>(
          <li key={discussion._id}>
            <Link to={`/discussion/${discussion._id}`}>
              {discussion.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubPage;
