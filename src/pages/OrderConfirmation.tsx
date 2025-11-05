import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Gift, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { gsap } from 'gsap';

interface OrderConfirmationProps {
  orderId: string;
  total: number;
  paymentMethod: string;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [discountCode, setDiscountCode] = useState('SAVE10NEXT');
  const [earnedPoints, setEarnedPoints] = useState(0);

  const orderDetails = location.state as OrderConfirmationProps;

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
      return;
    }

    // Calculate earned points (1 point per dollar)
    setEarnedPoints(Math.floor(orderDetails.total));

    // Animate elements on mount
    gsap.from('.confirmation-card', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    });
  }, [orderDetails, navigate]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      toast.success('Discount code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (!orderDetails) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Order Confirmation */}
        <Card className="confirmation-card p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-4">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-mono font-medium">{orderDetails.orderId}</p>
          </div>
          <Button onClick={handleContinueShopping}>
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>

        {/* Next Purchase Benefits */}
        <Card className="confirmation-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Gift className="h-5 w-5 text-roma-purple mr-2" />
              Next Purchase Benefits
            </h2>
          </div>

          <div className="space-y-4">
            {/* Discount Code */}
            <div className="bg-roma-purple/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Special Discount Code</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className="h-8"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <code className="block px-3 py-2 bg-white rounded text-lg font-mono">
                {discountCode}
              </code>
              <p className="text-sm text-gray-500 mt-2">
                Use this code at checkout for 10% off your next purchase
              </p>
            </div>

            {/* Earned Points */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Points Earned</h3>
              <p className="text-2xl font-bold text-roma-purple">
                +{earnedPoints} points
              </p>
              <p className="text-sm text-gray-500 mt-1">
                These points have been added to your account
              </p>
            </div>

            {/* Loyalty Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Loyalty Status</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-roma-purple"
                    style={{ width: '60%' }}
                  />
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Keep shopping to reach the next tier!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation; 