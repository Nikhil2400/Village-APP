import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // ✅ Import useTranslation
import '../styles/Register.css';

const Register = () => {
  const { t } = useTranslation(); // ✅ Initialize translation hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError(t('error_all_fields_required'));
      return;
    }

    try {
      console.log('➡️ Registering user:', formData);
      const res = await axios.post('http://localhost:5000/api/register', formData);

      if (res.data.success) {
        console.log('✅ Registration successful:', res.data);
        alert(t('registration_successful'));
        navigate('/login');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log('❌ Error during registration:', err);
      setError(err.response?.data?.message || t('registration_failed'));
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleRegister}>
        <h2 className="register-title">{t('register')}</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === 'user'}
              onChange={handleChange}
            />
            {t('user')}
          </label>
          {/* Uncomment if admin is needed later
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleChange}
            />
            {t('admin')}
          </label>
          */}
        </div>

        <input
          type="text"
          name="name"
          placeholder={t('name')}
          value={formData.name}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="email"
          name="email"
          placeholder={t('email')}
          value={formData.email}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder={t('password')}
          value={formData.password}
          onChange={handleChange}
          className="register-input"
          required
        />

        <button type="submit" className="register-button">{t('register')}</button>

        <p className="login-link">
          {t('already_have_account')}{' '}
          <span onClick={() => navigate('/login')} className="login-btn">
            {t('login')}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
