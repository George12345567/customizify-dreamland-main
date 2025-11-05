import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface GalleryItemProps {
  imageUrl: string;
  designName: string;
  color: string;
  colorName: string;
  index: number;
}

const GalleryItem = ({ imageUrl, designName, color, colorName, index }: GalleryItemProps) => {
  return (
    <Link
      to={`/design?color=${encodeURIComponent(color)}&name=${encodeURIComponent(colorName)}`}
      className="group relative overflow-hidden rounded-2xl glass-morphism transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-[3/4] w-full">
        <img
          src={imageUrl}
          alt={`${designName} hoodie design`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay with design details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{designName}</h3>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-white/80">{colorName}</span>
          </div>
        </div>
      </div>
      
      {/* Order Now Button */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gradient-roma p-2 rounded-full shadow-lg">
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
      </div>
    </Link>
  );
};

export default GalleryItem; 