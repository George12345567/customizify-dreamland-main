import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Calendar, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { gsap } from 'gsap';

interface PaymentOptionsProps {
  totalAmount: number;
  onPaymentMethodSelect: (method: string, details?: any) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ totalAmount, onPaymentMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [installmentMonths, setInstallmentMonths] = useState<number>(3);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalWithInterest, setTotalWithInterest] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0.15); // 15% annual interest rate
  const [showInstallmentDetails, setShowInstallmentDetails] = useState<boolean>(false);
  const [codFee, setCodFee] = useState<number>(5); // $5 COD fee
  const [codTotal, setCodTotal] = useState<number>(0);
  
  const installmentOptions = [3, 6, 9, 12];
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Calculate installment payments
  useEffect(() => {
    if (selectedMethod === 'installment') {
      // Simple interest calculation
      const interest = totalAmount * (interestRate / 12) * installmentMonths;
      const total = totalAmount + interest;
      const monthly = total / installmentMonths;
      
      setMonthlyPayment(monthly);
      setTotalWithInterest(total);
      
      onPaymentMethodSelect('installment', {
        monthlyPayment: monthly,
        totalWithInterest: total,
        interestRate: interestRate * 100,
        months: installmentMonths
      });
    } else if (selectedMethod === 'cod') {
      const total = totalAmount + codFee;
      
      onPaymentMethodSelect('cod', {
        total,
        fee: codFee
      });
    } else {
      onPaymentMethodSelect('card', {
        total: totalAmount
      });
    }
  }, [selectedMethod, installmentMonths, totalAmount, interestRate, codFee, onPaymentMethodSelect]);

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

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    
    // Animate the details section
    if (value === 'installment') {
      setShowInstallmentDetails(true);
      gsap.fromTo(
        '.installment-details',
        { opacity: 0, height: 0 },
        { opacity: 1, height: 'auto', duration: 0.4, ease: 'power2.out' }
      );
    } else if (value === 'cod') {
      gsap.fromTo(
        '.cod-details',
        { opacity: 0, height: 0 },
        { opacity: 1, height: 'auto', duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const handleInstallmentChange = (value: number[]) => {
    setInstallmentMonths(value[0]);
  };

  return (
    <div ref={containerRef} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={handleMethodChange}
        className="space-y-4"
      >
        {/* Credit Card Option */}
        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center cursor-pointer">
            <CreditCard className="mr-2 h-5 w-5 text-roma-purple" />
            <span className="font-medium">Credit/Debit Card</span>
          </Label>
        </div>
        
        {/* Installment Option */}
        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="installment" id="installment" />
          <Label htmlFor="installment" className="flex items-center cursor-pointer">
            <Calendar className="mr-2 h-5 w-5 text-roma-purple" />
            <span className="font-medium">Monthly Installments</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="ml-2 h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Split your payment into smaller monthly installments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        
        {/* Cash on Delivery Option */}
        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod" className="flex items-center cursor-pointer">
            <DollarSign className="mr-2 h-5 w-5 text-roma-purple" />
            <span className="font-medium">Cash on Delivery</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="ml-2 h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pay with cash when your order is delivered</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
      </RadioGroup>
      
      {/* Installment Details */}
      {selectedMethod === 'installment' && (
        <div className="installment-details mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Installment Plan Details</h3>
          
          <div className="mb-4">
            <Label htmlFor="months" className="block mb-2">Number of Months</Label>
            <div className="flex space-x-2">
              {installmentOptions.map((months) => (
                <Button
                  key={months}
                  variant={installmentMonths === months ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setInstallmentMonths(months)}
                >
                  {months} months
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Monthly Payment</p>
              <p className="text-xl font-bold">${monthlyPayment.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold">${totalWithInterest.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="text-xl font-bold">{(interestRate * 100).toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="flex items-center mb-1">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              No down payment required
            </p>
            <p className="flex items-center mb-1">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              Simple interest calculation
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              Flexible payment terms
            </p>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p className="flex items-center">
              <AlertCircle className="mr-1 h-3 w-3 text-amber-500" />
              By selecting this option, you agree to our installment terms and conditions
            </p>
          </div>
        </div>
      )}
      
      {/* COD Details */}
      {selectedMethod === 'cod' && (
        <div className="cod-details mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Cash on Delivery Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Order Total</p>
              <p className="text-xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">COD Fee</p>
              <p className="text-xl font-bold">${codFee.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="bg-roma-purple/10 p-3 rounded-lg mb-4">
            <p className="text-roma-purple font-medium">Total Amount Due on Delivery</p>
            <p className="text-2xl font-bold text-roma-purple">${(totalAmount + codFee).toFixed(2)}</p>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="flex items-center mb-1">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              Pay when you receive your order
            </p>
            <p className="flex items-center mb-1">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              Cash or card payment accepted by delivery agent
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              Available in select areas
            </p>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p className="flex items-center">
              <AlertCircle className="mr-1 h-3 w-3 text-amber-500" />
              A small convenience fee applies to COD orders
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions; 