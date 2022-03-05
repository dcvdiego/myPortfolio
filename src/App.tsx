import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Home from './pages/home';
import CertificationsPage from './pages/certifications/index';
import ExperiencesPage from './pages/experiences/index';
import ProjectsPage from './pages/projects/index';
import TestimonialsPage from './pages/testimonials/index';
import Navbar from './components/Navbar/index';
function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="experiences" element={<ProjectsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
