import { useEffect } from 'react';
import '../styles/App.css';
import Navbar from './Navbar';
import Header from './Header';
import WhyUs from './WhyUs';

import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <div className="App">
        <Navbar/>
        <Header/>
      <WhyUs/>
    </div>
  );
}

export default App;
