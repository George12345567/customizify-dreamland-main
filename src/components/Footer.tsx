
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-roma-black/60 glass-morphism mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Roma</h3>
            <p className="text-white/70 max-w-md">
              Redefining hoodie customization with groundbreaking technology and sleek design, 
              offering an unparalleled creative experience.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-roma-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/design" className="text-white/70 hover:text-roma-purple transition-colors">
                  Start Designing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-roma-purple transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white/70 hover:text-roma-purple transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Connect</h4>
            <div className="flex flex-col space-y-2">
              <a 
                href="mailto:Georgehelal87@gmail.com" 
                className="flex items-center text-white/70 hover:text-roma-purple transition-colors"
              >
                <Mail size={18} className="mr-2" />
                Georgehelal87@gmail.com
              </a>
              <a 
                href="tel:01070821379" 
                className="flex items-center text-white/70 hover:text-roma-purple transition-colors"
              >
                <Phone size={18} className="mr-2" />
                01070821379
              </a>
              <a 
                href="https://www.instagram.com/george.helal?igsh=MTNmc3p3aTFyc2p1dw%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-white/70 hover:text-roma-purple transition-colors"
              >
                <Instagram size={18} className="mr-2" />
                instagram.com/george.helal
              </a>
              <a 
                href="https://www.facebook.com/share/1FgKTEMdzL/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-white/70 hover:text-roma-purple transition-colors"
              >
                <Facebook size={18} className="mr-2" />
                facebook.com/share/1FgKTEMdzL/
              </a>
              <a 
                href="https://wa.me/01070821379" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-white/70 hover:text-roma-purple transition-colors"
              >
                <MessageSquare size={18} className="mr-2" />
                WhatsApp: 01070821379
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/50">
          <p>© {new Date().getFullYear()} Roma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
