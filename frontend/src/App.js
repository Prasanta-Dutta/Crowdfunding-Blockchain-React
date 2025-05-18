import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import LogInContext from './context/LogInContext';
import axios from 'axios';

import { NavBar, Footer, Hero, Card, CheckSession } from './components/index';
import { 
  ExploreCampaigns, 
  StartCampaign, 
  News, 
  Story, 
  SignUp, 
  SignIn, 
  Verification, 
  CreateCampaign, 
  MyCampaigns, 
  MyDonation
} from './pages/index';
import Logout from './pages/Logout';

axios.defaults.withCredentials = true;

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified , setIsVerified]= useState(false);

  return (
    <LogInContext.Provider value = {{isLoggedIn, setIsLoggedIn, isVerified, setIsVerified}}>
      <Router>
      <CheckSession />
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
          <Route path="/start-campaign" element={ !isLoggedIn ? <Navigate to={"/signin"} /> : !isVerified ? <Navigate to="/verification" /> : <CreateCampaign /> } />
          <Route path="/story" element={<Story />} />
          <Route path="/my-campaign" element={isLoggedIn ? <MyCampaigns /> : <Navigate to={"/signin"} />} />
          <Route path="/my-donation" element={isLoggedIn ? <MyDonation /> : <Navigate to={"/signin"} />} />
          <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to={"/"} />} />
          <Route path="/signin" element={!isLoggedIn ? <SignIn /> : <Navigate to={"/"} />} /> {/*Bcs of this after login go to "/"*/}
          <Route path="/verification" element={isLoggedIn ? <Verification /> : <Navigate to={"/signin"} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </LogInContext.Provider>
  );
}

export default App;
