import React, {components} from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Cards from './components/Cards';
import './App.css';

const App = () => {
  return (
    <div className="container">
        <Navbar />
        <Sidebar />
        <Cards />
    </div>
  );
};

export default App;
