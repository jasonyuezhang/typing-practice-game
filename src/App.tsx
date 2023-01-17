import React from 'react';
import logo from './logo.svg';
import './App.css';
import TypingArea from './components/TypingArea';

function App() {
  return (
    <div className="App">
      <TypingArea numberOfItems={17}/>
    </div>
  );
}

export default App;
