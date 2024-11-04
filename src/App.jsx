import { useState } from "react";
import './App.css'


function App() {

  const [photos, setPhotos] = useState([]);//setting the usestate of the newly declared variable of photos

  const getPhotoDataApi = () => {
    fetch(
      "https://api.nasa.gov/planetary/apod?count=3&api_key=spUnYRblEmcJfrS5h58I9Lh794AOtQ3rCcnOltEG"
    )
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data); // set photos in useState
        console.log("Data fetched and stored in useState:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Refresh page by resetting the photos state
  const refreshPage = () => {
    setPhotos([]); // Clear photos
    // getPhotoDataApi(); // Re-fetch photos
  };


  return (
    <>
      <div className="container">
        <header>
          <div className="head-bar">
            <h1>NASA Photo of the Day</h1>
            <button id="submit" onClick={getPhotoDataApi} className="get-photos">Click here to see the photos!</button>
          </div>
        </header>
        <section className="hero-section">
          <div className="heros-grid-container" id="cards">
            {photos.map((item, index) => (
              <div key={index} className="card-wrapper">
                <div className="card" id="card">
                  <h4 className="project-title">{item.title}</h4>
                  <img className="card-image" src={item.url} alt="${item.image}" />
                  <p className="card-description">{item.explanation}</p>
                  <p className="card-date">Date: {item.date}</p>
                  <p className="card-credits">Photographer: {item.copyright || "Unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="reset">
          <button onClick={refreshPage} className="refresh-button" id="reset">Reset</button>
        </div>
      </div>
    </>
  )
}

export default App;
