import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, ArrowRight, Sparkles, Star, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Lottie from 'lottie-react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import loadingAnimation from '@/assets/animations/loading.json';
import successAnimation from '@/assets/animations/success.json';
import HoodieBackground from '@/components/3D/HoodieBackground';

// Form validation helper
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  
  // Form validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');

  const formRef = useRef(null);
  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);
  const inputRefs = useRef([]);
  const successAnimationRef = useRef(null);
  const containerRef = useRef(null);

  // Check if form is complete
  useEffect(() => {
    if (activeTab === 'login') {
      setIsFormComplete(email && password && !emailError && !passwordError);
    } else {
      setIsFormComplete(
        name && 
        signupEmail && 
        password && 
        confirmPassword && 
        !nameError && 
        !signupEmailError && 
        !passwordError && 
        !confirmPasswordError
      );
    }
  }, [
    activeTab, 
    email, 
    password, 
    name, 
    signupEmail, 
    confirmPassword, 
    emailError, 
    passwordError, 
    nameError, 
    signupEmailError, 
    confirmPasswordError
  ]);

  useEffect(() => {
    // Initialize animations
    const tl = gsap.timeline();
    
    // Form entrance animation
    tl.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Input field animations
    inputRefs.current.forEach((input, index) => {
      if (input) {
        gsap.from(input, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.1 * index,
          ease: 'power2.out'
        });
      }
    });

    // 3D floating effect for the form container
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotateY: 5,
        rotateX: 2,
        duration: 1.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setIsShuffling(true);
    
    // Reset validation errors when switching tabs
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setSignupEmailError('');
    setConfirmPasswordError('');
    
    gsap.to(formRef.current, {
      scale: 0.98,
      opacity: 0.5,
      duration: 0.2,
      onComplete: () => {
        gsap.to(formRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          onComplete: () => setIsShuffling(false)
        });
      }
    });
  };

  const handleInputFocus = (index) => {
    gsap.to(inputRefs.current[index], {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleInputBlur = (index) => {
    gsap.to(inputRefs.current[index], {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  // Validation functions
  const validateLoginForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const validateSignupForm = () => {
    let isValid = true;
    
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!signupEmail) {
      setSignupEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(signupEmail)) {
      setSignupEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setSignupEmailError('');
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }
    
    setIsLoginLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoginLoading(false);
      toast.success('Successfully logged in!');
    }, 2000);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateSignupForm()) {
      return;
    }
    
    setIsSignupLoading(true);

    // Simulate signup process
    setTimeout(() => {
      setIsSignupLoading(false);
      toast.success('Account created successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HoodieBackground />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div 
          ref={containerRef}
          className="max-w-md w-full mx-auto perspective-1000"
          onMouseEnter={() => setIsFormHovered(true)}
          onMouseLeave={() => setIsFormHovered(false)}
        >
          <div 
            ref={formRef}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 transform-gpu transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-roma-purple/20 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-roma-purple/20 transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              {/* Login Tab Content */}
              <TabsContent value="login" className="mt-0">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>
                  <p className="text-white/70 mt-2">Sign in to continue your design journey</p>
                </div>

                <form ref={loginFormRef} onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="text-sm font-medium text-white/80 block">
                      Email
                    </label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-roma-purple transition-colors duration-300">
                        <Mail size={18} />
                      </span>
                      <input
                        ref={el => inputRefs.current[0] = el}
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleInputFocus(0)}
                        onBlur={() => handleInputBlur(0)}
                        className={`w-full bg-white/5 border ${emailError ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/30 transition-all duration-300 group-hover:border-roma-purple/20`}
                        placeholder="Enter your email"
                        required
                      />
                      {emailError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle size={18} />
                        </div>
                      )}
                    </div>
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1">{emailError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="login-password" className="text-sm font-medium text-white/80 block">
                      Password
                    </label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-roma-purple transition-colors duration-300">
                        <Lock size={18} />
                      </span>
                      <input
                        ref={el => inputRefs.current[1] = el}
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => handleInputFocus(1)}
                        onBlur={() => handleInputBlur(1)}
                        className={`w-full bg-white/5 border ${passwordError ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/30 transition-all duration-300 group-hover:border-roma-purple/20`}
                        placeholder="Enter your password"
                        required
                      />
                      {passwordError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle size={18} />
                        </div>
                      )}
                    </div>
                    {passwordError && (
                      <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoginLoading || isShuffling || !isFormComplete}
                    className={`w-full py-3 px-4 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-center ${
                      isLoginLoading || isShuffling || !isFormComplete ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                    }`}
                  >
                    {isLoginLoading ? (
                      <div className="w-6 h-6">
                        <Lottie animationData={loadingAnimation} loop={true} />
                      </div>
                    ) : (
                      <>
                        Sign In <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </button>
                </form>
              </TabsContent>

              {/* Signup Tab Content */}
              <TabsContent value="signup" className="mt-0">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gradient">Join Roma</h1>
                  <p className="text-white/70 mt-2">Create an account to start your design journey</p>
                </div>

                <form ref={signupFormRef} onSubmit={handleSignupSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80 block">
                      Full Name
                    </label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-roma-purple transition-colors duration-300">
                        <User size={18} />
                      </span>
                      <input
                        ref={el => inputRefs.current[2] = el}
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => handleInputFocus(2)}
                        onBlur={() => handleInputBlur(2)}
                        className={`w-full bg-white/5 border ${nameError ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/30 transition-all duration-300 group-hover:border-roma-purple/20`}
                        placeholder="Enter your full name"
                        required
                      />
                      {nameError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle size={18} />
                        </div>
                      )}
                    </div>
                    {nameError && (
                      <p className="text-red-500 text-xs mt-1">{nameError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium text-white/80 block">
                      Email
                    </label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-roma-purple transition-colors duration-300">
                        <Mail size={18} />
                      </span>
                      <input
                        ref={el => inputRefs.current[3] = el}
                        id="signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        onFocus={() => handleInputFocus(3)}
                        onBlur={() => handleInputBlur(3)}
                        className={`w-full bg-white/5 border ${signupEmailError ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/30 transition-all duration-300 group-hover:border-roma-purple/20`}
                        placeholder="Enter your email"
                        required
                      />
                      {signupEmailError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle size={18} />
                        </div>
                      )}
                    </div>
                    {signupEmailError && (
                      <p className="text-red-500 text-xs mt-1">{signupEmailError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-white/80 block">
                      Password
                    </label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-roma-purple transition-colors duration-300">
                        <Lock size={18} />
                      </span>
                      <input
                        ref={el => inputRefs.current[4] = el}
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => handleInputFocus(4)}
                        onBlur={() => handleInputBlur(4)}
                        className={`w-full bg-white/5 border ${passwordError ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/30 transition-all duration-300 group-hover:border-roma-purple/20`}
                        placeholder="Create a password"
                        required
                      />
                      {passwordError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle size={18} />
                        </div>
                      )}
                    </div>
                    {passwordError && (
                      <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80 block">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-roma-purple transition-colors duration-300">
                        <Lock size={18} />
                      </span>
                      <input
                        ref={el => inputRefs.current[5] = el}
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => handleInputFocus(5)}
                        onBlur={() => handleInputBlur(5)}
                        className={`w-full bg-white/5 border ${confirmPasswordError ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-roma-purple/30 transition-all duration-300 group-hover:border-roma-purple/20`}
                        placeholder="Confirm your password"
                        required
                      />
                      {confirmPasswordError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle size={18} />
                        </div>
                      )}
                    </div>
                    {confirmPasswordError && (
                      <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSignupLoading || isShuffling || !isFormComplete}
                    className={`w-full py-3 px-4 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-center ${
                      isSignupLoading || isShuffling || !isFormComplete ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                    }`}
                  >
                    {isSignupLoading ? (
                      <div className="w-6 h-6">
                        <Lottie animationData={loadingAnimation} loop={true} />
                      </div>
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Form overlay with CTA */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-all duration-300 transform translate-y-4 ${isFormHovered ? 'opacity-100 translate-y-0' : ''}`}>
              <div className="text-center">
                {activeTab === 'login' ? (
                  <p className="text-white/80">
                    Don't have an account?{' '}
                    <button
                      onClick={() => handleTabChange('signup')}
                      className="text-roma-purple hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className="text-white/80">
                    Already have an account?{' '}
                    <button
                      onClick={() => handleTabChange('login')}
                      className="text-roma-purple hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-roma-black px-2 text-white/50">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-white/20 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-white/20 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
