import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK_PROGRESS, UPDATE_BOOK_PROGRESS } from '../utils/queries';

const BookProgress: React.FC = () => {
  const { data, loading } = useQuery(GET_BOOK_PROGRESS, { variables: { bookId: 'some-book-id' } });
  const [updateProgress] = useMutation(UPDATE_BOOK_PROGRESS);

  if (loading) return <p>Loading...</p>;

  const handleProgressUpdate = async (newProgress: number) => {
    await updateProgress({ variables: { bookId: 'some-book-id', progress: newProgress } });
  };

  return (
    <div>
      <h1>Book Progress</h1>
      <p>Current Progress: {data?.getBookProgress.progress}%</p>
      <button onClick={() => handleProgressUpdate(data.getBookProgress.progress + 10)}>Increase Progress</button>
    </div>
  );
};

export default BookProgress;
