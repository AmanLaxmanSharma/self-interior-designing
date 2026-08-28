import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ConsultationModal from './components/ConsultationModal';
import ProtectedRoute from './components/ProtectedRoute';

// Keep Home synchronous for fast First Paint, lazy-load all other routes
import Home from './pages/Home';

// Lazy-loaded Customer Pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Inspiration = lazy(() => import('./pages/Inspiration'));
const Studio3D = lazy(() => import('./pages/Studio3D'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy-loaded User Portal Pages
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));

// Lazy-loaded Admin Portal Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminModels3D = lazy(() => import('./pages/admin/AdminModels3D'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Minimal fast fallback loader
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-warm-ivory">
    <div className="w-8 h-8 border-3 border-[#3F5036]/20 border-t-[#3F5036] rounded-full animate-spin" />
  </div>
);

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/register';

  // Intelligent Consultation Popup Trigger after 5 seconds
  useEffect(() => {
    const isSubmitted = localStorage.getItem('karoli_lead_submitted');
    const isDismissed = sessionStorage.getItem('karoli_popup_dismissed');

    if (!isSubmitted && !isDismissed && !isAuthRoute) {
      const timer = setTimeout(() => {
        setIsQuoteModalOpen(true);
      }, 5000); // 5 Seconds delay
      return () => clearTimeout(timer);
    }
  }, [isAuthRoute]);

  const handleCloseModal = () => {
    setIsQuoteModalOpen(false);
    sessionStorage.setItem('karoli_popup_dismissed', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans">
      {!isAuthRoute && (
        <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      )}

      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Customer Routes */}
            <Route path="/" element={<Home onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<Terms />} />

          {/* Protected Customer Routes (Only visible/accessible after login/register) */}
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/:id"
            element={
              <ProtectedRoute>
                <ServiceDetails onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inspiration"
            element={
              <ProtectedRoute>
                <Inspiration onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/3d-studio"
            element={
              <ProtectedRoute>
                <Studio3D onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
              </ProtectedRoute>
            }
          />

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
      </Suspense>
    </div>

      {!isAuthRoute && (
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
