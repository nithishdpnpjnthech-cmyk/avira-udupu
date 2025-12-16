
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { apiClient } from '../../services/api';

const UserAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth ? useAuth() : { signIn: async () => ({ user: null, error: { message: 'No Auth' } }), signUp: async () => ({ user: null, error: { message: 'No Auth' } }) };
  const [authMode, setAuthMode] = useState('login'); // login | register | forgot
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const isLogin = authMode === 'login';
  const isRegister = authMode === 'register';
  const isForgot = authMode === 'forgot';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setInfo('');
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (isRegister && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (isRegister && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!isForgot) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (isRegister && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    if (isRegister && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    setInfo('');
    
    try {
      if (isForgot) {
        const response = await apiClient.post('/password/forgot', { email: formData.email });
        const message = response?.data?.message || 'If the email exists, a reset link has been sent.';
        setInfo(message);
        setError('');
      } else if (isLogin) {
        const { user, error } = await signIn(formData.email, formData.password);
        if (user) {
          // Get the redirect URL from location state or default to homepage
          const from = location.state?.from || '/homepage';
          navigate(from, { replace: true });
        } else if (error) {
          setError(error.message || 'Invalid credentials');
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        // Registration using AuthContext signUp method
        const { user, error } = await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });
        
        if (user) {
          // Registration successful and user is automatically logged in
          const from = location.state?.from || '/homepage';
          navigate(from, { replace: true });
        } else if (error) {
          setError(error.message || 'Registration failed');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'An error occurred. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setAuthMode(nextMode);
    setError('');
    setInfo('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-warm-lg">
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
                {isLogin ? 'Welcome Back' : isRegister ? 'Create Account' : 'Reset Password'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin && 'Sign in to your account'}
                {isRegister && (<span>Join <span className="text-royal-blue">Avira Udupu's</span> Family</span>)}
                {isForgot && 'We will email you a reset link'}
              </p>
              {location.state?.message && (
                <p className="text-primary text-sm font-medium mt-2">
                  {location.state.message}
                </p>
              )}
            </div>
            {(error || errors.general) && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6">
                <p className="text-destructive text-sm">{error || errors.general}</p>
              </div>
            )}
            {info && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-6">
                <p className="text-primary text-sm">{info}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
              )}
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              {isRegister && (
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
              )}
              {!isForgot && (
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />
              )}
              {isRegister && (
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                />
              )}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => switchMode('forgot')}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <Button
                type="submit"
                variant="default"
                fullWidth
                size="lg"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : isRegister ? 'Create Account' : 'Send Reset Link')}
              </Button>
            </form>
            <div className="mt-6 text-center">
              {isLogin && (
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="text-primary hover:underline font-medium"
                >
                  Don't have an account? Sign up
                </button>
              )}
              {isRegister && (
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-primary hover:underline font-medium"
                >
                  Already have an account? Sign in
                </button>
              )}
              {isForgot && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-primary hover:underline font-medium block w-full"
                  >
                    Remembered your password? Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode('register')}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Need an account? Create one
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAuth;