import React from 'react';
import Logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import { Profile } from './Profile';

const Navbar = ({ keyword, setKeyword, getTracks, userPhotoURL }) => {
  
  const handleSearch = () => {
    getTracks();
  };

  return (
    <>

    <nav className="navbar navbar-expand-lg bg-gradient sticky-top" style={{ backgroundColor: '#7c7e81' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="rounded-circle mx-3" src={Logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </Link>
        
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
          <input
            value={keyword}
            onChange={(e) =>  setKeyword(e.target.value) }
            className="form-control me-2 w-75"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button onClick={handleSearch} className="btn btn-lg btn-primary" style={{ backgroundColor: '#ff23c8' }}>
            Search
          </button>
          {/* Logout Button inside Profile */}
          <Profile userPhotoURL={userPhotoURL} />
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
