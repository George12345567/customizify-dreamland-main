import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Lock, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import PaymentOptions from '@/components/PaymentOptions';
import CryptoPayment from '@/components/CryptoPayment';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import { gsap } from 'gsap';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Custom Hoodie',
      price: 49.99,
      quantity: 1,
      image: '/images/hoodie-preview.jpg'
    }
  ]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(5.99);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(500); // Example points
  const [referralCode, setReferralCode] = useState('FRIEND123'); // Example code
  const [redeemedPoints, setRedeemedPoints] = useState(0);
  
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Calculate totals
  useEffect(() => {
    const itemsTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(itemsTotal);
    
    // Calculate tax (8% of subtotal)
    const taxAmount = itemsTotal * 0.08;
    setTax(taxAmount);
    
    // Calculate total
    let finalTotal = itemsTotal + shipping + taxAmount;
    
    // Adjust total if using installment or COD
    if (paymentMethod === 'installment' && paymentDetails) {
      finalTotal = paymentDetails.totalWithInterest;
    } else if (paymentMethod === 'cod' && paymentDetails) {
      finalTotal = paymentDetails.total;
    }
    
    setTotal(finalTotal);
  }, [cartItems, shipping, paymentMethod, paymentDetails]);

  // Animation on mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodSelect = (method: string, details?: any) => {
    setPaymentMethod(method);
    setPaymentDetails(details);
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
        !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode || 
        !shippingInfo.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Order placed successfully!');
      
      // Navigate to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderId: `ORD-${Date.now().toString().slice(-6)}`,
          total,
          paymentMethod
        } 
      });
    }, 2000);
  };

  // Handle points redemption
  const handlePointsRedeem = (points: number) => {
    if (points > loyaltyPoints) {
      toast.error('Insufficient points');
      return;
    }
    setRedeemedPoints(points);
    setLoyaltyPoints(prev => prev - points);
    toast.success(`Redeemed ${points} points for $${(points * 0.01).toFixed(2)} discount`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <div ref={containerRef} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {paymentMethod === 'installment' && paymentDetails && (
                  <div className="flex justify-between text-roma-purple">
                    <span>Interest</span>
                    <span>${(paymentDetails.totalWithInterest - subtotal - shipping - tax).toFixed(2)}</span>
                  </div>
                )}
                {paymentMethod === 'cod' && paymentDetails && (
                  <div className="flex justify-between text-roma-purple">
                    <span>COD Fee</span>
                    <span>${paymentDetails.fee.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {paymentMethod === 'installment' && paymentDetails && (
                  <div className="text-sm text-gray-500 mt-1">
                    <p>Monthly payment: ${paymentDetails.monthlyPayment.toFixed(2)}</p>
                    <p>Total with interest: ${paymentDetails.totalWithInterest.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={shippingInfo.fullName} 
                    onChange={handleInputChange} 
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={shippingInfo.email} 
                    onChange={handleInputChange} 
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={shippingInfo.address} 
                    onChange={handleInputChange} 
                    placeholder="123 Main St"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={shippingInfo.city} 
                    onChange={handleInputChange} 
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    value={shippingInfo.state} 
                    onChange={handleInputChange} 
                    placeholder="NY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode" 
                    value={shippingInfo.zipCode} 
                    onChange={handleInputChange} 
                    placeholder="10001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={shippingInfo.phone} 
                    onChange={handleInputChange} 
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Payment Options */}
          <div className="lg:col-span-1">
            {/* Payment Options Component */}
            <PaymentOptions 
              totalAmount={subtotal + shipping + tax} 
              onPaymentMethodSelect={handlePaymentMethodSelect} 
            />
            
            {/* Terms and Place Order */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted} 
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} 
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <a href="#" className="text-roma-purple hover:underline">Terms and Conditions</a> and <a href="#" className="text-roma-purple hover:underline">Privacy Policy</a>
                </Label>
              </div>
              
              <Button 
                className="w-full py-6 text-lg" 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Lock className="mr-2 h-5 w-5" />
                    Place Order
                  </div>
                )}
              </Button>
              
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Shield className="mr-2 h-4 w-4" />
                Secure checkout
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Truck className="h-5 w-5 text-roma-purple mr-2" />
                <h3 className="font-medium">Shipping Information</h3>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Free shipping on orders over $100. Standard delivery 3-5 business days.
              </p>
              <p className="text-sm text-gray-500">
                International shipping available to select countries. Additional fees may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 