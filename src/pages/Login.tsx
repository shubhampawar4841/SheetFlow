import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import authService from '@/services/authService';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    await authService.login(credentials.email, credentials.password);
    toast.success('Logged in successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Sheet<span className="text-primary">Flow</span>
        </h1>
        <AuthForm 
          isLogin={true} 
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
