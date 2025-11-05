import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HoodieCard from '../components/HoodieCard';

const showcaseHoodies = [
  { color: "#8B5CF6", name: "Royal Purple" },
  { color: "#0EA5E9", name: "Ocean Blue" },
  { color: "#D946EF", name: "Flamingo Pink" },
  { color: "#F97316", name: "Sunset Orange" },
  { color: "#22C55E", name: "Forest Green" },
  { color: "#18181B", name: "Midnight Black" },
  { color: "#F8FAFC", name: "Pure White" },
  { color: "#EF4444", name: "Ruby Red" },
];

const Index = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* Hoodie Showcase */}
        <section className="py-20 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-roma-pink/10 rounded-full filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Designs</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Browse our collection of trending hoodies or create your own custom design
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {showcaseHoodies.map((hoodie, index) => (
                <HoodieCard
                  key={hoodie.name}
                  color={hoodie.color}
                  name={hoodie.name}
                  index={index}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/design"
                className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-roma font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-105"
              >
                Start Designing Your Own <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-20 relative bg-roma-black/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Roma?</h2>
                
                <div className="space-y-4">
                  <div className="glass-morphism p-4 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">Advanced 3D Customization</h3>
                    <p className="text-white/70">
                      Immersive 3D design interface with real-time updates and dynamic lighting.
                    </p>
                  </div>
                  
                  <div className="glass-morphism p-4 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
                    <p className="text-white/70">
                      Ethically sourced materials and expert craftsmanship for ultimate comfort and durability.
                    </p>
                  </div>
                  
                  <div className="glass-morphism p-4 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">Innovative Features</h3>
                    <p className="text-white/70">
                      Cutting-edge technology including AR previews and voice controls for a seamless experience.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="perspective">
                <div className="w-full aspect-square max-w-md mx-auto relative preserve-3d">
                  {/* Placeholder for a 3D feature showcase */}
                  <div className="absolute inset-0 bg-gradient-to-br from-roma-purple to-roma-blue rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-float">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-center p-8">
                        <div className="text-6xl font-bold mb-4">3D</div>
                        <div className="text-xl">Real-time Customization</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-morphism p-8 md:p-12 rounded-2xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
                Ready to Design Your Perfect Hoodie?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join the revolution in hoodie customization with Roma's state-of-the-art 3D design platform.
              </p>
              <Link
                to="/design"
                className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-roma font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-105"
              >
                Start Designing <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
