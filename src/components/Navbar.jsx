import React from 'react';
import Logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import { Profile } from './Profile';

const Navbar = ({ keyword, setKeyword, getTracks, userPhotoURL }) => {
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    getTracks();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-gradient sticky-top" style={{ backgroundColor: '#7c7e81' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="rounded-circle mx-3" src={Logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex w-100" onSubmit={handleSearch}>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control me-2 flex-grow-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button type="submit" className="btn btn-lg btn-primary" style={{ backgroundColor: '#ff23c8' }}>
              Search
            </button>
          </form>

          {/* Profile and Logout Button */}
          <Profile userPhotoURL={userPhotoURL} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
