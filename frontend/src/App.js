import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NavBar, Footer, Hero, Card } from './components/index'
import { ExploreCampaigns, StartCampaign, News, Story, SignUp, SignIn } from './pages/index';

function App() {
  return (
    <>
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

      
    </>
  );
}

export default App;
