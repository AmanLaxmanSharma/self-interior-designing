import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Register is now integrated into the Login page as a tab
const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to unified login/register page (register tab handled there)
    navigate('/login', { replace: true });
  }, [navigate]);
  return null;
};

export default Register;
