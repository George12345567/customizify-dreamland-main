import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-roma bg-clip-text text-transparent">
            Roma
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/gallery" label="Gallery" currentPath={location.pathname} />
          <NavLink to="/design" label="Start Designing" currentPath={location.pathname} />
          <NavLink to="/about" label="About" currentPath={location.pathname} />
          <NavLink to="/login" label="Login / Sign Up" currentPath={location.pathname} />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="neo-blur md:hidden absolute top-full left-0 w-full py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          <NavLink to="/" label="Home" currentPath={location.pathname} mobile />
          <NavLink to="/gallery" label="Gallery" currentPath={location.pathname} mobile />
          <NavLink to="/design" label="Start Designing" currentPath={location.pathname} mobile />
          <NavLink to="/about" label="About" currentPath={location.pathname} mobile />
          <NavLink to="/login" label="Login / Sign Up" currentPath={location.pathname} mobile />
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
  mobile?: boolean;
}

const NavLink = ({ to, label, currentPath, mobile }: NavLinkProps) => {
  const isActive = currentPath === to || 
                  (to === "/login" && currentPath === "/signup") ||
                  (to === "/signup" && currentPath === "/login");
  
  return (
    <Link
      to={to}
      className={`${
        mobile ? 'block w-full py-2' : ''
      } relative font-medium transition-all duration-300 hover:text-roma-purple ${
        isActive 
          ? 'text-roma-purple'
          : 'text-white/80 hover:text-white'
      }`}
    >
      {label}
      <span 
        className={`absolute -bottom-1 left-0 h-0.5 bg-roma-purple transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`} 
      />
    </Link>
  );
};

export default Navbar;
