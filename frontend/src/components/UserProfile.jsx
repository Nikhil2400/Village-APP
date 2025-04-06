import React, { useState } from 'react';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email: user.email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password updated successfully.");
        setNewPassword('');
        setConfirmPassword('');
        setShowResetForm(false);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Error updating password.");
    }
  };

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user.name || 'N/A'}</p>
      <p><strong>Email:</strong> {user.email || 'N/A'}</p>
    
      <p><strong>Password:</strong> 🔒 Hidden for security</p>

      {!showResetForm ? (
        <button onClick={() => setShowResetForm(true)} className="reset-btn">🔁 Reset Password</button>
      ) : (
        <form onSubmit={handlePasswordReset} className="reset-form">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
          <button type="button" onClick={() => setShowResetForm(false)}>Cancel</button>
        </form>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UserProfile;
