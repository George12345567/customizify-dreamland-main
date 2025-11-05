import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Star, ArrowRight, Shuffle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedButton from '../components/AnimatedButton';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Sample gallery data
const galleryItems = [
  {
    id: 1,
    imageUrl: '/hoodies/hoodie-1.png',
    designName: 'Cosmic Dreams',
    description: 'A celestial design featuring intricate star patterns',
    color: '#8B5CF6',
    gradient: 'from-purple-600 to-blue-600',
    isWide: true,
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 2,
    imageUrl: '/hoodies/hoodie-2.png',
    designName: 'Urban Flow',
    description: 'Modern street art inspired abstract patterns',
    color: '#0EA5E9',
    gradient: 'from-blue-600 to-cyan-600',
    isWide: false,
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 3,
    imageUrl: '/hoodies/hoodie-3.png',
    designName: 'Nature\'s Embrace',
    description: 'Organic patterns inspired by natural elements',
    color: '#22C55E',
    gradient: 'from-green-600 to-emerald-600',
    isWide: true,
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 4,
    imageUrl: '/hoodies/hoodie-4.png',
    designName: 'Digital Wave',
    description: 'Futuristic design with dynamic wave patterns',
    color: '#D946EF',
    gradient: 'from-pink-600 to-purple-600',
    isWide: false,
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 5,
    imageUrl: '/hoodies/hoodie-5.png',
    designName: 'Geometric Harmony',
    description: 'Bold geometric shapes in perfect balance',
    color: '#F97316',
    gradient: 'from-orange-600 to-red-600',
    isWide: true,
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 6,
    imageUrl: '/hoodies/hoodie-6.png',
    designName: 'Neon Nights',
    description: 'Vibrant neon-inspired abstract design',
    color: '#06B6D4',
    gradient: 'from-cyan-600 to-blue-600',
    isWide: false,
    icon: <Sparkles className="w-6 h-6" />
  }
];

const Gallery: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize item refs
    itemRefs.current = itemRefs.current.slice(0, galleryItems.length);

    // Fade in gallery items on scroll with stagger effect
    const items = itemRefs.current;
    items.forEach((item, index) => {
      if (!item) return;

      gsap.from(item, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  const handleShuffle = () => {
    if (isShuffling || !galleryRef.current) return;
    setIsShuffling(true);

    const items = [...itemRefs.current];
    const positions = items.map(item => {
      if (!item) return null;
      const rect = item.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    });

    // Animate items to random positions
    items.forEach((item, index) => {
      if (!item) return;
      const randomIndex = Math.floor(Math.random() * items.length);
      const targetPos = positions[randomIndex];
      if (!targetPos) return;

      gsap.to(item, {
        x: targetPos.left - positions[index]!.left,
        y: targetPos.top - positions[index]!.top,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    });

    // Reset positions
    setTimeout(() => {
      items.forEach(item => {
        if (!item) return;
        gsap.to(item, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => setIsShuffling(false)
        });
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Design Gallery
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Explore our collection of unique hoodie designs. Each piece is crafted to make a statement.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <AnimatedButton
              variant="primary"
              size="lg"
              icon={<ArrowRight className="ml-2" />}
              iconPosition="right"
              onClick={() => navigate('/design')}
            >
              Start Designing
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              icon={<Shuffle className="ml-2" />}
              iconPosition="right"
              onClick={handleShuffle}
              disabled={isShuffling}
            >
              Shuffle Gallery
            </AnimatedButton>
          </div>
        </section>

        {/* Gallery Grid */}
        <section
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemRefs.current[index] = el}
              className="group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg glass-morphism transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:scale-[1.02]">
                <div className={`relative ${item.isWide ? 'aspect-[4/3]' : 'aspect-square'}`}>
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  />

                  {/* Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.designName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Link
                        to="/design"
                        className="inline-flex items-center text-white bg-roma-purple/80 hover:bg-roma-purple px-4 py-2 rounded-lg transition-colors duration-300"
                      >
                        Customize Design <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Floating elements */}
                  {hoveredItem === item.id && (
                    <>
                      <div className="absolute top-4 left-4 animate-float" style={{ animationDelay: '0.2s' }}>
                        {item.icon}
                      </div>
                      <div className="absolute top-4 right-4 animate-float" style={{ animationDelay: '0.4s' }}>
                        <Sparkles className="w-6 h-6" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-4 px-2">
                <h3 className="text-xl font-semibold mb-2">{item.designName}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Your Perfect Hoodie?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Start with one of our designs or create something completely unique. The possibilities are endless.
          </p>
          <AnimatedButton
            variant="primary"
            size="lg"
            icon={<ArrowRight className="ml-2" />}
            iconPosition="right"
            onClick={() => navigate('/design')}
          >
            Start Creating Now
          </AnimatedButton>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery; 