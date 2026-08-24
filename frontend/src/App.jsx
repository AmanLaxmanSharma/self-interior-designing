import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ConsultationModal from './components/ConsultationModal';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Inspiration from './pages/Inspiration';
import Studio3D from './pages/Studio3D';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// User Portal Pages
import UserDashboard from './pages/user/UserDashboard';

// Admin Portal Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminProjects from './pages/admin/AdminProjects';
import AdminServices from './pages/admin/AdminServices';
import AdminGallery from './pages/admin/AdminGallery';
import AdminModels3D from './pages/admin/AdminModels3D';
import AdminSettings from './pages/admin/AdminSettings';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Intelligent Consultation Popup Trigger after 5 seconds
  useEffect(() => {
    const isSubmitted = localStorage.getItem('karoli_lead_submitted');
    const isDismissed = sessionStorage.getItem('karoli_popup_dismissed');

    if (!isSubmitted && !isDismissed && !isAdminRoute) {
      const timer = setTimeout(() => {
        setIsQuoteModalOpen(true);
      }, 5000); // 5 Seconds delay
      return () => clearTimeout(timer);
    }
  }, [isAdminRoute]);

  const handleCloseModal = () => {
    setIsQuoteModalOpen(false);
    sessionStorage.setItem('karoli_popup_dismissed', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans">
      {!isAdminRoute && (
        <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      )}

      <div className="flex-1">
        <Routes>
          {/* Public Customer Routes */}
          <Route path="/" element={<Home onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/about" element={<About onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/services" element={<Services onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/services/:id" element={<ServiceDetails onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/projects" element={<Projects onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/projects/:id" element={<ProjectDetails onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/inspiration" element={<Inspiration onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/3d-studio" element={<Studio3D onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<Terms />} />

          {/* User Portal Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/models"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminModels3D />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isAdminRoute && (
        <>
          <Footer onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
          <FloatingContact />
        </>
      )}

      {/* Consultation Popup Modal */}
      <ConsultationModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
