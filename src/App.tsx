import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DonationsList from './pages/DonationsList';
import DonateForm from './pages/DonateForm';
import ResourceRequest from './pages/ResourceRequest';
import FirstAid from './pages/FirstAid';
import SignIn from './pages/SignIn';
import Navigation from './components/Navigation';
import FireLocations from './pages/FireLocations';
import ShelterLocations from './pages/ShelterLocations';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/donations" element={<DonationsList />} />
          <Route path="/donate" element={<DonateForm />} />
          <Route path="/request-resources" element={<ResourceRequest />} />
          <Route path="/first-aid" element={<FirstAid />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/fires" element={<FireLocations />} />
          <Route path="/shelters" element={<ShelterLocations />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;