import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & Reset Password
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleForgotPassword = async () => {
    if (!email || !validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://52.66.183.128:5000/api/forgot-password', { email });
      setMessage(res.data.message);
      setStep(2); // Move to OTP step
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      setMessage('Please enter OTP and new password.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://52.66.183.128:5000/api/reset-password', { email, otp, newPassword });
      setMessage(res.data.message);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <button onClick={handleForgotPassword} className="login-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="login-input"
            />
            <button onClick={handleResetPassword} className="login-button" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}

        {message && <p className="message-text">{message}</p>}
        <p onClick={() => navigate('/login')} className="register-btn">Back to Login</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
