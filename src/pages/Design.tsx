import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Check, ChevronDown, Palette, ShoppingCart, CreditCard, Save, Send, ArrowLeft, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '../components/ui/card';

const hoodieColors = [
  { name: "Royal Purple", color: "#8B5CF6" },
  { name: "Ocean Blue", color: "#0EA5E9" },
  { name: "Flamingo Pink", color: "#D946EF" },
  { name: "Sunset Orange", color: "#F97316" },
  { name: "Forest Green", color: "#22C55E" },
  { name: "Midnight Black", color: "#18181B" },
  { name: "Pure White", color: "#F8FAFC" },
  { name: "Ruby Red", color: "#EF4444" },
];

const sizes = [
  { value: "S", label: "Small (S)" },
  { value: "M", label: "Medium (M)" },
  { value: "L", label: "Large (L)" },
  { value: "XL", label: "Extra Large (XL)" },
  { value: "XXL", label: "Double XL (XXL)" },
];

const paymentMethods = [
  { id: "visa", name: "Visa", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
  { id: "ewallet", name: "Electronic Wallet", icon: "📱" },
];

interface CartItem {
  color: typeof hoodieColors[0];
  size: string;
  id: string;
}

const Design = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlColor = queryParams.get('color');
  const urlColorName = queryParams.get('name');

  const findInitialColor = () => {
    if (urlColor && urlColorName) {
      const exactMatch = hoodieColors.find(c => c.color === urlColor && c.name === urlColorName);
      if (exactMatch) return exactMatch;
      
      const colorMatch = hoodieColors.find(c => c.color === urlColor);
      if (colorMatch) return colorMatch;
    }
    return hoodieColors[0];
  };

  const [selectedColor, setSelectedColor] = useState(findInitialColor());
  const [selectedSize, setSelectedSize] = useState(sizes[0].value);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedDesigns, setSavedDesigns] = useState<CartItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
  const [designerName, setDesignerName] = useState('');
  const [designerEmail, setDesignerEmail] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  // Payment states
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'details' | 'confirmation'>('method');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (urlColor && urlColorName) {
      toast.success(`${urlColorName} design selected! Customize as needed.`);
    }
  }, [urlColor, urlColorName]);

  const handleSaveDesign = () => {
    const newDesign = {
      color: selectedColor,
      size: selectedSize,
      id: Date.now().toString(),
    };
    setSavedDesigns([...savedDesigns, newDesign]);
    toast.success("Design saved successfully!");
  };

  const handleAddToCart = () => {
    const newItem = {
      color: selectedColor,
      size: selectedSize,
      id: Date.now().toString(),
    };
    setCart([...cart, newItem]);
    toast.success("Added to cart!");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setShowPaymentScreen(true);
    setPaymentStep('method');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmitDesign = () => {
    if (!designerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!designerEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!validateEmail(designerEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowNameInput(false);
      setDesignerName('');
      setDesignerEmail('');
      setEmailError('');
      toast.success(`Thank you for your submission, ${designerName}! We'll feature your design on our social media soon.`);
    }, 1500);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setPaymentStep('details');
  };

  const handleBackToMethods = () => {
    setPaymentStep('method');
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    } 
    // Format expiry date with slash
    else if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    }
    // Only allow numbers for CVV
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '');
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    }
    else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentStep('confirmation');
    }, 2000);
  };

  const handleClosePayment = () => {
    setShowPaymentScreen(false);
    setPaymentStep('method');
    setCardDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    });
    setSelectedWallet('');
  };

  const renderPaymentScreen = () => {
    if (!showPaymentScreen) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="glass-morphism rounded-2xl p-6 w-full max-w-md relative">
          <button 
            onClick={handleClosePayment}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            ✕
          </button>
          
          {paymentStep === 'method' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Select Payment Method</h2>
              <p className="text-white/70">Choose how you'd like to pay for your order</p>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className="w-full p-4 rounded-lg border border-white/20 hover:border-roma-purple/50 transition-all duration-300 flex items-center space-x-4"
                  >
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-medium">{method.name}</p>
                      <p className="text-white/60 text-sm">Pay with {method.name}</p>
                    </div>
                    <ArrowRight size={18} className="text-white/60" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {paymentStep === 'details' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-white/60">
                <button onClick={handleBackToMethods}>
                  <ArrowLeft size={18} />
                </button>
                <span>Back to payment methods</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white">Payment Details</h2>
              
              {selectedPaymentMethod === 'visa' && (
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-white/70 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-white/70 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="relative">
                      <label className="block text-white/70 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        maxLength={3}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-white/70 mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={cardDetails.nameOnCard}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-white/60 text-sm mt-4">
                    <Lock size={14} />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                  
                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.nameOnCard}
                    className="w-full py-3 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessingPayment ? "Processing..." : "Confirm Payment"}
                  </button>
                </div>
              )}
              
              {selectedPaymentMethod === 'paypal' && (
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/20 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-4">🅿️</div>
                    <p className="text-white mb-4">You will be redirected to PayPal to complete your payment</p>
                    <button
                      onClick={handleProcessPayment}
                      disabled={isProcessingPayment}
                      className="w-full py-3 rounded-lg bg-[#0070ba] text-white font-medium transition-all duration-300 hover:bg-[#005ea6] flex items-center justify-center"
                    >
                      {isProcessingPayment ? "Redirecting..." : "Continue to PayPal"}
                    </button>
                  </div>
                </div>
              )}
              
              {selectedPaymentMethod === 'ewallet' && (
                <div className="space-y-4">
                  <p className="text-white/70 mb-4">Select your preferred electronic wallet</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleWalletSelect('google')}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        selectedWallet === 'google'
                          ? "border-roma-purple bg-roma-purple/20"
                          : "border-white/20 hover:border-roma-purple/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">G</div>
                      <div className="text-sm text-white">Google Pay</div>
                    </button>
                    
                    <button
                      onClick={() => handleWalletSelect('apple')}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        selectedWallet === 'apple'
                          ? "border-roma-purple bg-roma-purple/20"
                          : "border-white/20 hover:border-roma-purple/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">🍎</div>
                      <div className="text-sm text-white">Apple Pay</div>
                    </button>
                  </div>
                  
                  {selectedWallet && (
                    <button
                      onClick={handleProcessPayment}
                      disabled={isProcessingPayment}
                      className="w-full py-3 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] flex items-center justify-center mt-4"
                    >
                      {isProcessingPayment ? "Processing..." : `Pay with ${selectedWallet === 'google' ? 'Google Pay' : 'Apple Pay'}`}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          
          {paymentStep === 'confirmation' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Check size={32} className="text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
              <p className="text-white/70">Thank you for your order. Your payment has been processed successfully.</p>
              
              <div className="pt-4">
                <button
                  onClick={handleClosePayment}
                  className="w-full py-3 rounded-lg bg-white/10 text-white font-medium transition-all duration-300 hover:bg-white/20"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-12">Customize Your Hoodie</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 order-1">
              <div className="relative h-[500px] glass-morphism rounded-2xl p-6 perspective">
                <div className="w-full h-full flex items-center justify-center perspective preserve-3d">
                  <div 
                    className="w-80 h-96 relative transition-all duration-500 hover:scale-105 animate-3d-rotate"
                    style={{ animationDuration: '30s' }}
                  >
                    <div 
                      className="w-full h-full rounded-2xl shadow-2xl transition-colors duration-300"
                      style={{ backgroundColor: selectedColor.color }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className={`text-8xl font-bold ${selectedColor.name === "Pure White" ? "text-gray-900" : "text-white"}`}>
                          R
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Submit Your Design Section */}
              <div className="mt-6 glass-morphism rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Submit Your Design</h2>
                <p className="text-white/70 mb-4">Share your creation with the world! We'll feature your design on our social media.</p>
                
                {!showNameInput ? (
                  <button
                    onClick={() => setShowNameInput(true)}
                    className="w-full py-3 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] flex items-center justify-center"
                  >
                    Submit Your Design <Send className="ml-2" size={18} />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-white/70 mb-2">Enter Your Name</label>
                      <input
                        type="text"
                        value={designerName}
                        onChange={(e) => setDesignerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all duration-300"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-white/70 mb-2">Enter Your Email</label>
                      <input
                        type="email"
                        value={designerEmail}
                        onChange={(e) => {
                          setDesignerEmail(e.target.value);
                          setEmailError('');
                        }}
                        placeholder="example@example.com"
                        className={`w-full bg-white/5 border ${
                          emailError ? 'border-red-500' : 'border-white/20'
                        } rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all duration-300`}
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowNameInput(false);
                          setDesignerName('');
                          setDesignerEmail('');
                          setEmailError('');
                        }}
                        className="flex-1 py-3 rounded-lg bg-white/10 text-white font-medium transition-all duration-300 hover:bg-white/20"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitDesign}
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="order-2">
              <div className="glass-morphism rounded-2xl p-6">
                <div className="space-y-6">
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold text-white mb-3">Select Color</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {hoodieColors.map((colorOption) => (
                        <button
                          key={colorOption.name}
                          className={`w-full aspect-square rounded-full flex items-center justify-center transition-all border-2 ${
                            selectedColor.name === colorOption.name
                              ? "border-white scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                          onClick={() => setSelectedColor(colorOption)}
                        >
                          {selectedColor.name === colorOption.name && (
                            <Check size={18} className={colorOption.name === "Pure White" ? "text-black" : "text-white"} />
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-white font-medium pt-2">{selectedColor.name}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Select Size</h3>
                    <div className="relative">
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-roma-purple/50 transition-all duration-300"
                      >
                        {sizes.map((size) => (
                          <option key={size.value} value={size.value}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Payment Method</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`p-3 rounded-lg border transition-all duration-300 ${
                            selectedPaymentMethod === method.id
                              ? "border-roma-purple bg-roma-purple/20"
                              : "border-white/20 hover:border-roma-purple/50"
                          }`}
                        >
                          <div className="text-2xl mb-1">{method.icon}</div>
                          <div className="text-sm text-white">{method.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSaveDesign}
                      className="w-full py-3 rounded-lg bg-white/10 text-white font-medium transition-all duration-300 hover:bg-white/20 flex items-center justify-center"
                    >
                      Save Design <Save className="ml-2" size={18} />
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3 rounded-lg bg-gradient-roma text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] flex items-center justify-center"
                    >
                      Add to Cart <ShoppingCart className="ml-2" size={18} />
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3 rounded-lg bg-white/10 text-white font-medium transition-all duration-300 hover:bg-white/20 flex items-center justify-center"
                    >
                      Checkout <CreditCard className="ml-2" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-morphism rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-white/60 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className="w-8 h-8 rounded-full"
                              style={{ backgroundColor: item.color.color }}
                            />
                            <div>
                              <p className="text-white font-medium">{item.color.name}</p>
                              <p className="text-white/60 text-sm">Size: {item.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setCart(cart.filter((i) => i.id !== item.id))}
                            className="text-white/60 hover:text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {savedDesigns.length > 0 && (
              <div className="glass-morphism rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Saved Designs</h2>
                <div className="space-y-4">
                  {savedDesigns.map((design) => (
                    <Card key={design.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: design.color.color }}
                          />
                          <div>
                            <p className="text-white font-medium">{design.color.name}</p>
                            <p className="text-white/60 text-sm">Size: {design.size}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Payment Modal */}
      {renderPaymentScreen()}
    </div>
  );
};

export default Design;
