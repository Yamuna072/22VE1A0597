import { useState } from 'react';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [referrerInput, setReferrerInput] = useState('');

  const fakeGeoLocation = {
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
  };

  const handleShortUrl = () => {
    if (!originalUrl) return;
    const randomId = Math.random().toString(36).substring(7);
    const generatedShortUrl = `https://localhost:8080/${randomId}`;
    setShortUrl(generatedShortUrl);
    setAnalytics(null);
    setClickCount(0);
  };

  const handleAnalytics = () => {
    setClickCount(prev => prev + 1);
    setAnalytics({
      referrer: referrerInput || "N/A",
      location: `${fakeGeoLocation.city}, ${fakeGeoLocation.region}, ${fakeGeoLocation.country}`,
      timestamp: new Date().toLocaleString(),  // Timestamp added here
    });
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Shortened URL</h1>

      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter original URL"
        style={{ width: 300, padding: 5 }}
      />
      <br /><br />

      <button onClick={handleShortUrl}>Shorten URL</button>

      {shortUrl && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Shortened URL:</strong> <a href={originalUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>

          <input
            type="text"
            value={referrerInput}
            onChange={(e) => setReferrerInput(e.target.value)}
            placeholder="Enter referrer (optional)"
            style={{ width: 300, padding: 5 }}
          />
          <br /><br />

          <button onClick={handleAnalytics}>Get Analytics</button>
        </div>
      )}

      {analytics && (
        <div style={{ marginTop: 20 }}>
          <h2>Analytics</h2>
          <p><strong>Clicks:</strong> {clickCount}</p>
          <p><strong>Referrer:</strong> {analytics.referrer}</p>
          <p><strong>Location (Source IP):</strong> {analytics.location}</p>
          <p><strong>Timestamp:</strong> {analytics.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default App;
