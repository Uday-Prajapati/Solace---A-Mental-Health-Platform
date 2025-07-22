import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Keep this if you're planning to use it
import Home from './components/Home';
import Services from './components/Services';
import Help from './components/Help'; // Import the Help component
import Login from './components/Login'; // Import Login component
import Depression from './components/Depression';
import Stress from './components/Stress';
import PTSD from './components/PTSD';
import Anxiety from './components/Anxiety';
import Test from './components/Test'; // Change this line to import the correct Test component
import Books from './components/Books'; // Import Books component
import Video from './components/Video'; // Import Video component
import Music from './components/Music'; // Import Music component
import Share from './components/Share'; // Import Music component
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> {/* Add Navbar if you need it */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} /> {/* Keep this line as is */}
            <Route path="/services" element={<Services />} />
            <Route path="/help" element={<Help />} /> {/* Add Help route */}
            <Route path="/share" element={<Share />} />
            <Route path="/login" element={<Login />} /> {/* Ensure "login" matches here */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Test Routes */}
            <Route path="/depression" element={<Depression />} />
            <Route path="/stress" element={<Stress />} />
            <Route path="/ptsd" element={<PTSD />} />
            <Route path="/anxiety" element={<Anxiety />} />
            <Route path="/books" element={<Books />} /> {/* Ensure these components exist */}
            <Route path="/video" element={<Video />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
