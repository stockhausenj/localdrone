import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';

function Home() {
  return (
    <div>
      <h2>Our Services</h2>
      <ul>
        <li>Real Estate Photography</li>
        <li>Aerial Surveying</li>
        <li>Event Coverage</li>
        <li>Infrastructure Inspection</li>
        {/* Add more services as needed */}
      </ul>
      <h2>Contact Us</h2>
      <p>For bookings and inquiries, please contact us at:</p>
      <p>Email: info@localdrone.com</p>
      <p>Phone: +1 (555) 123-4567</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to LocalDrone</h1>
          <p>Your go-to site for local drone services.</p>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2023 LocalDrone. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
