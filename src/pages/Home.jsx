import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { auth } from '../firebase/config';
import Navbar from '../components/Navbar';
import { TrackList } from '../components/TrackList';

export const Home = () => {

  const { tracks, isLoading, keyword, setKeyword, getTracks } = useFetch();
  const [userPhotoURL, setUserPhotoURL] = useState('');

  useEffect(() => {
    getTracks();
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserPhotoURL(user.photoURL);
      } else {
        setUserPhotoURL('');
      }
    });
    return () => unsub();
  }, [])
  
  return (
    // <Router>
    <>
      <Navbar 
      keyword={keyword} 
      setKeyword={setKeyword} 
      getTracks={getTracks} 
      userPhotoURL={userPhotoURL} 
      />
      <TrackList tracks={tracks} isLoading={isLoading} keyword={keyword} />
      
    </>
  );
}

export default Home;