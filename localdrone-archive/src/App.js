import FindButton from './FindButton';
import BeButton from './BeButton';
import drone from './drone.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PilotList from './PilotList';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={drone} className="App-logo" alt="logo" />
          <p>
            Find drone pilots near you! Soon...
          </p>
          <div>
            <FindButton />
            <BeButton />
          </div>
        </header>
        <main>
        <Routes>
          <Route path="/pilots" element={<PilotList />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
