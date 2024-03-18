
export const TrackList = ({ tracks, isLoading, keyword }) => {
  return (

    <div className="container">
      {/* lo\ding Spinner icon*/}
      <div className={`row ${isLoading ? "" : "d-none"}`}>
        <div className="col-12 py-5 text-center">
          <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      {/* Song Cards */}
      <div className={`row ${keyword === "" ? "" : "d-none"}`}>
        {tracks.map((element, index) => (
          <div key={element.id} className="col-lg-3 col-md-6 py-2">
            <div className="card" style={{ width: "18rem" }}>
              <img src={element.album.images[1].url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <p className="card-text">
                  Artist: {element.album.artists[0].name}
                </p>
                <p className="card-text">
                  Release Date: {element.album.release_date}
                </p>
                <audio
                  src={element.preview_url}
                  controls
                  className="w-100">
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
