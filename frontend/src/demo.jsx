import { useState } from 'react';
import axios from 'axios';
import Navbars from './components/Navbars';

function App() {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [username, setName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const accessToken = 'pk.b1abc61b75dafad499beb0938ff134f3'; // Replace with your LocationIQ Access Token

  const searchLocation = async (query) => {
    const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${accessToken}&q=${encodeURIComponent(query)}&format=json`;

    try {
      const response = await axios.get(url);
      setSuggestions(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching location suggestions');
    }
  };

  const handleSelect = (suggestion) => {
    setLocation(suggestion.display_name);
    setLatitude(Number(suggestion.lat)); // Ensure latitude is a number
    setLongitude(Number(suggestion.lon)); // Ensure longitude is a number
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      searchLocation(location);
    } else {
      setError('Please enter a valid location');
    }
  };

  const storeToDB = () => {
    const data = {
      username,
      latitude,
      longitude,
    };

    // Use axios to send data to the backend (Express.js)
    axios.post('http://localhost:3000/add', data)
      .then(response => {
        console.log('Location stored successfully', response.data);
      })
      .catch(error => {
        console.error('Error storing location', error);
      });
  };

  return (
    <div>
        <Navbars />
        <div className="App" style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Enter Your Location</h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder='Enter criminal name'
            onChange={(e) => setName(e.target.value)}
          />

          <div style={{ marginBottom: '10px' }}>
            <label>
              Search for a location:
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (e.target.value.trim()) {
                    searchLocation(e.target.value);
                  }
                }}
                placeholder="Enter location"
                style={{ padding: '10px', width: '300px' }}
              />
            </label>
          </div>

          {/* Display suggestions */}
          {suggestions.length > 0 && (
            <div className="autocomplete-dropdown-container" style={{ marginTop: '10px', border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto' }}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f9f9f9' }}
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion.display_name}
                </div>
              ))}
            </div>
          )}

          <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Submit</button>
        </form>

        {latitude && longitude && (
          <div>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <button onClick={storeToDB} style={{ padding: '10px 20px', marginTop: '20px' }}>Store to Database</button>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
