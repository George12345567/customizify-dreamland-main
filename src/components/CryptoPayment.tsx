import React, { useState, useEffect } from 'react';
import { Bitcoin, Ethereum, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { gsap } from 'gsap';

interface CryptoPaymentProps {
  amount: number;
  onPaymentSelect: (method: string, details: any) => void;
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({ amount, onPaymentSelect }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | null>(null);
  const [exchangeRate, setExchangeRate] = useState<{ BTC: number; ETH: number }>({ BTC: 0, ETH: 0 });
  const [loading, setLoading] = useState(false);
  const [transactionFee, setTransactionFee] = useState<{ BTC: number; ETH: number }>({
    BTC: 0.0001, // Example fee in BTC
    ETH: 0.001   // Example fee in ETH
  });

  // Fetch real-time exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // In production, replace with actual API calls
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const data = await response.json();
        setExchangeRate({
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd
        });
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Fallback rates for development
        setExchangeRate({
          BTC: 50000,
          ETH: 3000
        });
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const calculateCryptoAmount = (crypto: 'BTC' | 'ETH') => {
    const baseAmount = amount / exchangeRate[crypto];
    const fee = transactionFee[crypto];
    return (baseAmount + fee).toFixed(8);
  };

  const handleCryptoSelect = (crypto: 'BTC' | 'ETH') => {
    setSelectedCrypto(crypto);
    const cryptoAmount = calculateCryptoAmount(crypto);
    
    onPaymentSelect('crypto', {
      currency: crypto,
      amount: cryptoAmount,
      exchangeRate: exchangeRate[crypto],
      fee: transactionFee[crypto]
    });
  };

  const handlePayment = async () => {
    if (!selectedCrypto) return;
    
    setLoading(true);
    try {
      // In production, integrate with Coinbase Commerce or similar
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful payment
      onPaymentSelect('crypto', {
        status: 'success',
        currency: selectedCrypto,
        amount: calculateCryptoAmount(selectedCrypto)
      });
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Cryptocurrency Payment</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Pay with Bitcoin or Ethereum</p>
              <p className="text-xs text-gray-400">Real-time exchange rates apply</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card
          className={`p-4 cursor-pointer transition-all ${
            selectedCrypto === 'BTC' ? 'border-roma-purple bg-roma-purple/5' : ''
          }`}
          onClick={() => handleCryptoSelect('BTC')}
        >
          <div className="flex items-center space-x-2">
            <Bitcoin className="h-6 w-6 text-orange-500" />
            <span className="font-medium">Bitcoin</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {exchangeRate.BTC ? `1 BTC ≈ $${exchangeRate.BTC.toLocaleString()}` : 'Loading...'}
          </p>
          {selectedCrypto === 'BTC' && (
            <p className="text-sm font-medium mt-2">
              {calculateCryptoAmount('BTC')} BTC
            </p>
          )}
        </Card>

        <Card
          className={`p-4 cursor-pointer transition-all ${
            selectedCrypto === 'ETH' ? 'border-roma-purple bg-roma-purple/5' : ''
          }`}
          onClick={() => handleCryptoSelect('ETH')}
        >
          <div className="flex items-center space-x-2">
            <Ethereum className="h-6 w-6 text-blue-500" />
            <span className="font-medium">Ethereum</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {exchangeRate.ETH ? `1 ETH ≈ $${exchangeRate.ETH.toLocaleString()}` : 'Loading...'}
          </p>
          {selectedCrypto === 'ETH' && (
            <p className="text-sm font-medium mt-2">
              {calculateCryptoAmount('ETH')} ETH
            </p>
          )}
        </Card>
      </div>

      {selectedCrypto && (
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            <p>Transaction fee: {transactionFee[selectedCrypto]} {selectedCrypto}</p>
            <p>Total amount: {calculateCryptoAmount(selectedCrypto)} {selectedCrypto}</p>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                Pay with {selectedCrypto}
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CryptoPayment; 