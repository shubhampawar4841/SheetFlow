import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar = ({ isAuthenticated, onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
          >
            Sheet<span className="text-primary">Flow</span>
          </h1>
        </div>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button
                variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                onClick={() => navigate('/dashboard')}
                className="button-hover"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 button-hover"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={location.pathname === '/login' ? 'default' : 'ghost'}
                onClick={() => navigate('/login')}
                className="button-hover"
              >
                Login
              </Button>
              <Button
                variant={location.pathname === '/signup' ? 'default' : 'outline'}
                onClick={() => navigate('/signup')}
                className="button-hover"
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;