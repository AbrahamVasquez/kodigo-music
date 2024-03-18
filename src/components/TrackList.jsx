
export const TrackList = ({ tracks, isLoading, keyword }) => {
  if (isLoading) {
    return <div className="bg-primary text-light">Loading...</div>;
  }

  if (!tracks || tracks.length === 0) {
    return <div>No tracks found for "{keyword}"</div>;
  }

  return (
    <div className="container">
      {/* Song Cards */}
      <div className="row">
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
                  className="w-100"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
