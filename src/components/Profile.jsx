import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';

export const Profile = ({ userPhotoURL }) => {
  
  const handleLogOut = () => {
    auth.signOut().then(() => {
      window.location.href= "/login";
    })
  }
 
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className='nav-link' to="/profile">
          <img src={userPhotoURL} alt="User Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </Link>
      </li>
      <li className="nav-item">
        <button className="btn btn-danger ml-5 rounded-circle" onClick={handleLogOut}>Log out</button>
      </li>
    </ul>
  );
};
