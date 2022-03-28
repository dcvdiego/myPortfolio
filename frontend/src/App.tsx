import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Home from './pages/home';
import CertificationsPage from './pages/certifications/index';
import ExperiencesPage from './pages/experiences/index';
import ProjectsPage from './pages/projects/index';
import TestimonialsPage from './pages/testimonials/index';
import Project from './pages/projects/[slug]';
import Experience from './pages/experiences/[slug]';
import Custom404 from './pages/404';
import AboutPage from './pages/about';
import CredsPage from './pages/creds';
import { detectWebGLContext } from './utils/generalHelpers';

detectWebGLContext();

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="creds" element={<CredsPage />} />

          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="experiences/:slug" element={<Experience />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<Project />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
