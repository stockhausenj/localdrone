import FindButton from './FindButton';
import BeButton from './BeButton';
import drone from './drone.svg';
import './App.css';

function App() {
  return (
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
    </div>
  );
}

export default App;
