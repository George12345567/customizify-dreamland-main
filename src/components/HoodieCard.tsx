
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HoodieCardProps {
  color: string;
  name: string;
  index: number;
}

const HoodieCard = ({ color, name, index }: HoodieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Navigate to design page with color information
    navigate(`/design?color=${encodeURIComponent(color)}&name=${encodeURIComponent(name)}`);
  };
  
  return (
    <div 
      className="hoodie-card perspective animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`preserve-3d transition-all duration-700 ${isHovered ? 'rotate-y-45' : ''}`}>
        <div className="relative h-64 w-full flex items-center justify-center">
          <div 
            className={`absolute inset-0 opacity-20 blur-xl rounded-full ${isHovered ? 'scale-110' : 'scale-100'} transition-all duration-500`}
            style={{ backgroundColor: color }}
          />
          
          <div 
            className="w-48 h-48 relative transition-all duration-500"
            style={{ transform: isHovered ? 'scale(1.1) rotateY(45deg)' : 'scale(1) rotateY(0)' }}
          >
            {/* This is a placeholder for the 3D hoodie model - in a real implementation, this would be a Three.js canvas */}
            <div 
              className="w-full h-full rounded-xl shadow-2xl"
              style={{ backgroundColor: color }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">H</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-white/60 text-sm">Custom Design</p>
        </div>
      </div>
    </div>
  );
};

export default HoodieCard;
