
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'sonner';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully! Signup functionality will be fully implemented in the next phase");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center relative pt-20 pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-roma-blue/20 rounded-full filter blur-3xl opacity-40 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-roma-purple/20 rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-roma-pink/20 rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="w-full max-w-md z-10 p-1">
          <div className="glass-morphism p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gradient">Join Roma</h1>
              <p className="text-white/70 mt-2">Create an account to start your design journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80 block">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                    <User size={18} />
                  </span>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80 block">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white/80 block">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                    <Lock size={18} />
                  </span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                    <Lock size={18} />
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center ${
                  isLoading ? 'opacity-70' : 'hover:scale-[1.03]'
                }`}
              >
                {isLoading ? (
                  <div className="h-5 w-5 rounded-full border-2 border-white border-r-transparent animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Already have an account?{' '}
                <Link to="/login" className="text-roma-purple hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-roma-black px-2 text-white/50">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium transition-all hover:bg-white/10"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium transition-all hover:bg-white/10"
                >
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
