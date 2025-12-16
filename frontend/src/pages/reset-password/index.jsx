import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { apiClient } from '../../services/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setInfo('');
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!token) {
      nextErrors.token = 'Reset link is missing or invalid.';
    }
    if (!formData.password) {
      nextErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');
    setInfo('');

    try {
      const response = await apiClient.post('/password/reset', {
        token,
        newPassword: formData.password
      });

      const success = response?.data?.success !== false;
      if (success) {
        const message = response?.data?.message || 'Password has been reset. Please sign in with your new password.';
        setInfo(message);
        setTimeout(() => navigate('/user-login'), 1400);
      } else {
        const message = response?.data?.message || 'Unable to reset password. The link may be invalid or expired.';
        setError(message);
      }
    } catch (err) {
      setError('An error occurred while resetting your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-warm-lg">
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Reset Password</h1>
              <p className="text-muted-foreground">Enter your new password to finish resetting your account.</p>
            </div>

            {(error || errors.token) && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6">
                <p className="text-destructive text-sm">{error || errors.token}</p>
              </div>
            )}
            {info && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-6">
                <p className="text-primary text-sm">{info}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />

              <Button
                type="submit"
                variant="default"
                fullWidth
                size="lg"
                disabled={loading || !token}
              >
                {loading ? 'Please wait...' : 'Update Password'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/user-login" className="text-primary hover:underline font-medium">
                Return to sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
