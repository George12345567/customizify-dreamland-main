
import { useEffect } from 'react';
import { Facebook, Instagram, Mail, Phone, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* About Hero */}
        <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-60 left-20 w-96 h-96 bg-roma-purple/20 rounded-full filter blur-3xl opacity-50" />
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-roma-blue/20 rounded-full filter blur-3xl opacity-50" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in">
                About Roma
              </h1>
              <p className="text-xl text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Redefining hoodie customization with groundbreaking technology and sleek design,
                offering an unparalleled creative experience.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Vision</h2>
              <div className="glass-morphism p-8 rounded-2xl">
                <p className="text-white/80 mb-6">
                  Roma was founded with a clear mission: to revolutionize the way people customize their apparel. 
                  We believe that personalization should be an immersive, intuitive, and exciting experience.
                </p>
                <p className="text-white/80 mb-6">
                  Through cutting-edge technology and a passion for design, we've created a platform that 
                  brings your creative visions to life with unprecedented precision and ease.
                </p>
                <p className="text-white/80">
                  Our team of designers, developers, and fashion enthusiasts work tirelessly to push the 
                  boundaries of what's possible in digital fashion customization. From lifelike 3D 
                  rendering to innovative design tools, we're setting new standards in the industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Connect With Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <ContactCard 
                icon={<Mail size={32} />}
                title="Email"
                contact="Georgehelal87@gmail.com"
                link="mailto:Georgehelal87@gmail.com"
                delay={0.1}
              />
              
              <ContactCard 
                icon={<Phone size={32} />}
                title="Phone"
                contact="01070821379"
                link="tel:01070821379"
                delay={0.2}
              />
              
              <ContactCard 
                icon={<Instagram size={32} />}
                title="Instagram"
                contact="@george.helal"
                link="https://www.instagram.com/george.helal?igsh=MTNmc3p3aTFyc2p1dw%3D%3D&utm_source=qr"
                delay={0.3}
              />
              
              <ContactCard 
                icon={<Facebook size={32} />}
                title="Facebook"
                contact="george.helal"
                link="https://www.facebook.com/share/1FgKTEMdzL/?mibextid=wwXIfr"
                delay={0.4}
              />
              
              <ContactCard 
                icon={<MessageSquare size={32} />}
                title="WhatsApp"
                contact="01070821379"
                link="https://wa.me/01070821379"
                delay={0.5}
              />
            </div>
          </div>
        </section>
        
        {/* Designer Credit */}
        <section className="py-6 relative">
          <div className="container mx-auto px-4">
            <p className="text-center text-white/60 text-sm animate-fade-in">
              Web designed by George
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  contact: string;
  link: string;
  delay: number;
}

const ContactCard = ({ icon, title, contact, link, delay }: ContactCardProps) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-morphism p-6 rounded-xl text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-roma flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70">{contact}</p>
    </a>
  );
};

export default About;
