import React, { useState, useEffect } from 'react';
import { Star, Gift, Share2, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { gsap } from 'gsap';

interface LoyaltyProgramProps {
  points: number;
  onPointsRedeem: (points: number) => void;
  referralCode: string;
}

const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({
  points,
  onPointsRedeem,
  referralCode
}) => {
  const [copied, setCopied] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [nextTier, setNextTier] = useState({
    name: 'Gold',
    points: 1000,
    progress: 0
  });

  // Calculate progress to next tier
  useEffect(() => {
    const tiers = [
      { name: 'Bronze', points: 0 },
      { name: 'Silver', points: 500 },
      { name: 'Gold', points: 1000 },
      { name: 'Platinum', points: 2000 }
    ];

    const currentTier = tiers.find(tier => points >= tier.points);
    const nextTierIndex = tiers.findIndex(tier => tier.name === currentTier?.name) + 1;
    
    if (nextTierIndex < tiers.length) {
      const nextTierPoints = tiers[nextTierIndex].points;
      const progress = ((points - currentTier!.points) / (nextTierPoints - currentTier!.points)) * 100;
      
      setNextTier({
        name: tiers[nextTierIndex].name,
        points: nextTierPoints,
        progress: Math.min(progress, 100)
      });
    }
  }, [points]);

  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast.success('Referral code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy referral code');
    }
  };

  const handleRedeemPoints = () => {
    if (redeemAmount <= 0 || redeemAmount > points) {
      toast.error('Invalid points amount');
      return;
    }
    onPointsRedeem(redeemAmount);
    setRedeemAmount(0);
  };

  return (
    <div className="space-y-6">
      {/* Points Display */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            Loyalty Points
          </h3>
          <span className="text-2xl font-bold text-roma-purple">{points}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Progress to {nextTier.name}</span>
            <span>{Math.round(nextTier.progress)}%</span>
          </div>
          <Progress value={nextTier.progress} className="h-2" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Points Value</p>
            <p className="font-semibold">${(points * 0.01).toFixed(2)}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Next Tier</p>
            <p className="font-semibold">{nextTier.name}</p>
          </div>
        </div>
      </Card>

      {/* Points Redemption */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Gift className="h-5 w-5 text-roma-purple mr-2" />
          Redeem Points
        </h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(Number(e.target.value))}
              className="flex-1 p-2 border rounded"
              placeholder="Enter points to redeem"
              min="0"
              max={points}
            />
            <Button
              onClick={handleRedeemPoints}
              disabled={redeemAmount <= 0 || redeemAmount > points}
            >
              Redeem
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Redeem value: ${(redeemAmount * 0.01).toFixed(2)}
          </p>
        </div>
      </Card>

      {/* Referral Program */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Share2 className="h-5 w-5 text-roma-purple mr-2" />
          Referral Program
        </h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={referralCode}
              readOnly
              className="flex-1 p-2 border rounded bg-gray-50"
            />
            <Button
              onClick={handleCopyReferral}
              variant="outline"
              className="min-w-[100px]"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Share your referral code and earn 100 points for each friend's first purchase!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoyaltyProgram; 