import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import LogInContext from './context/LogInContext';
import axios from 'axios';

import { NavBar, Footer, Hero, Card, CheckSession } from './components/index';
import { ExploreCampaigns, StartCampaign, News, Story, SignUp, SignIn } from './pages/index';

axios.defaults.withCredentials = true;

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LogInContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
      <CheckSession />
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Card />
                <Footer />
              </>
            }
          />
          <Route path='/news' element={<News />} />
          <Route path="/explore-campaigns" element={<ExploreCampaigns />} />
          <Route path="/start-campaign" element={<StartCampaign />} />
          <Route path="/story" element={<Story />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </LogInContext.Provider>
  );
}

export default App;
