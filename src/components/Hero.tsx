
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-roma-purple/20 rounded-full filter blur-3xl opacity-50 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-roma-blue/20 rounded-full filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 z-10 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left space-y-6 md:pr-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-gradient">Customize</span> Your Perfect Hoodie
          </h1>
          
          <p className="text-xl text-white/70 max-w-lg mx-auto md:mx-0">
            Experience the next generation of hoodie customization with cutting-edge 
            3D technology and immersive design tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Link
              to="/design"
              className="px-8 py-3 rounded-full bg-gradient-roma font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-105"
            >
              Start Designing
              <ArrowRight className="inline ml-2" size={18} />
            </Link>
            
            <Link
              to="/about"
              className="px-8 py-3 rounded-full bg-transparent border border-white/20 font-medium text-white hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-12 md:mt-0">
          <div className="relative perspective">
            <div className="w-full h-80 md:h-96 relative preserve-3d animate-3d-rotate">
              {/* This is a placeholder for the 3D hoodie model - in a real implementation, this would be a Three.js canvas */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-roma-purple to-roma-blue rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.5)]">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">R</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-roma-pink/30 rounded-full filter blur-3xl animate-pulse-glow" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-roma-orange/30 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
