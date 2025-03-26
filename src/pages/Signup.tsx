import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import authService from '@/services/authService';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignup = async (credentials: { email: string; password: string; name?: string }) => {
    if (!credentials.name) {
      throw new Error('Name is required');
    }
    
    await authService.register(credentials.email, credentials.password, credentials.name);
    toast.success('Account created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Sheet<span className="text-primary">Flow</span>
        </h1>
        <AuthForm 
          isLogin={false} 
          onSubmit={handleSignup}
          nameRequired
          emailRequired
        />
      </div>
    </div>
  );
};

export default Signup;
