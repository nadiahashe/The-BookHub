import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLUB } from '../utils/queries';

const ClubPage: React.FC = () => {
  const { data, loading } = useQuery(GET_CLUB, { variables: { clubId: 'some-club-id' } });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.getClub.name}</h1>
      <p>{data.getClub.description}</p>
      <h3>Members</h3>
      <ul>
        {data.getClub.members.map((member: any) => (
          <li key={member._id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClubPage;
