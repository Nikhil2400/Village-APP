import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import { useTranslation } from 'react-i18next'; // ✅ Add this

const Login = ({ setUser, setIsAdmin }) => {
  const { t } = useTranslation(); // ✅ Translation hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password, role });

      if (res.data.success) {
        const loggedInUser = res.data.user;
        const token = res.data.token;

        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (setUser) setUser(loggedInUser);
        if (setIsAdmin) setIsAdmin(role === 'admin');

        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }

        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert(t('login_error'));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{t('login')}</h2>

        <div className="role-selection">
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            {t('user_login')}
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            {t('admin_login')}
          </label>
        </div>

        <input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button onClick={handleLogin} className="login-button">
          {t('login')}
        </button>

        <div className="link-group">
          <p>
            {t('no_account')}{' '}
            <span onClick={() => navigate('/register')} className="register-btn">
              {t('register')}
            </span>
          </p>
          <p>
            <span onClick={() => navigate('/forgot-password')} className="forgot-password">
              {t('forgot_password')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
